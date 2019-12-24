const path = require('path');
const glob = require('glob');

// Export a function. Accept the base config as the only param.
module.exports = async ({ config, mode }) => {
    // `mode` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.
    // Make whatever fine-grained changes you need

    /**
     * Exclude pacakge's `node_modules` from Storybook babel processing.
     */
    const babelLoader = config.module.rules[0];
    glob.sync('./packages/*/node_modules').forEach(match => {
        babelLoader.exclude.push(path.resolve(match));
    });

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/]
    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader")
    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
        require.resolve("@babel/preset-react"),
        require.resolve("@babel/preset-env"),
        require.resolve("@emotion/babel-preset-css-prop"),
    ]
    config.module.rules[0].use[0].options.plugins = [
        // use @babel/plugin-proposal-class-properties for class arrow functions
        require.resolve("@babel/plugin-proposal-class-properties"),
        // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
        require.resolve("babel-plugin-remove-graphql-queries"),
        require.resolve("babel-plugin-emotion"),
    ]
    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ["browser", "module", "main"]

    // Return the altered config
    return config;
};