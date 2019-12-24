const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const https = require('https');
const sharp = require('sharp');
const SVGO = require('svgo');

const { GraphQLClient } = require('graphql-request');

const svgo = new SVGO({
  plugins: [
    {
      removeViewBox: false,
    },
    {
      removeDimensions: true,
    },
  ],
});

const cacheDir = path.resolve(__dirname, '../.cache');

function download(file, dest, cb) {
  const fileStream = fs.createWriteStream(dest);

  https.get(file.url, (response) => {
    response.pipe(fileStream);
    fileStream.on('finish', () => {
      fileStream.close(() => cb({ file, dest }));
    });
  });
}

function getBarethemePlugins(plugins) {
  const paths = [];

  plugins.forEach((plugin) => {
    paths.push(`${plugin.name}/client`);
  });

  const dependencies = paths.map((p) => `require('${p}').default`);
  const file = `
    const dependencies = [${dependencies}];
    export default {
      link: dependencies.find(d => d.link).link,
      components: dependencies.reduce((acc, d) => d.components ? [...acc, ...d.components] : acc, []),
      onAcceptCookies: () => {
          dependencies.forEach(d => d.onAcceptCookies && d.onAcceptCookies())
      },
      onDeclineCookies: () => {
          dependencies.forEach(d => d.onDeclineCookies && d.onDeclineCookies())
      },
    };
  `;

  fse.outputFile(path.resolve(cacheDir, 'addons.js'), file);
}

async function prefetchAssets(apiKey) {
  const datoCmsClient = apiKey
    ? new GraphQLClient('https://graphql.datocms.com', {
      headers: {
        authorization: `Bearer ${apiKey}`,
      },
    })
    : null;

  if (!datoCmsClient) return;

  const layoutQuery = await datoCmsClient.request(`
    query {
      layout {
        lightThemeLogo {
          url
          id
          format
          alt
        }
        darkThemeLogo {
          url
          id
          format
          alt
        }
      }
    }
  `);

  const assets = path.resolve(cacheDir, 'assets');
  fse.ensureDir(assets);

  const { lightThemeLogo } = layoutQuery.layout;
  const { darkThemeLogo } = layoutQuery.layout;
  const files = [
    {
      url: lightThemeLogo.url,
      format: lightThemeLogo.format,
      alt: lightThemeLogo.alt,
      name: 'light-theme-logo',
    },
    {
      url: darkThemeLogo.url,
      format: darkThemeLogo.format,
      alt: darkThemeLogo.alt,
      name: 'dark-theme-logo',
    },
  ];

  files.forEach((file) => {
    download(
      file,
      path.resolve(assets, `${file.name}.${file.format}`),
      async ({ file, dest }) => {
        let content;
        if (file.format === 'png') {
          const buffer = await sharp(dest)
            .resize(500)
            .toBuffer();
          content = `data:image/png;base64,${buffer.toString('base64')}`;
        } else {
          content = fs.readFileSync(dest);
          const svg = await svgo.optimize(content);
          content = svg.data;
        }
        content = `module.exports = {
        meta: ${JSON.stringify(file)},
        file: '${content}',
      }`;
        fse.outputFile(path.resolve(assets, `${file.name}.js`), content);
      },
    );
  });
}

module.exports = async (ctx, themeOptions) => {
  fse.ensureDirSync(cacheDir);
  fse.emptyDirSync(cacheDir);
  getBarethemePlugins(themeOptions.plugins);
  await prefetchAssets(themeOptions.apiKey);
};
