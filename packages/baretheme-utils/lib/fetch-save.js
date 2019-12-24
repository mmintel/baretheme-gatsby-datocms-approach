const fse = require('fs-extra');
const prompts = require('prompts');
const path = require('path');

const fetch = require('./fetch');

module.exports = async function fetchSave({ necessaryModels, ignoreSubfieldsIn }) {
  const output = path.resolve(process.cwd(), './data/models.json');
  let apiKey = process.env.DATOCMS_API_KEY;

  if (!apiKey) {
    const questions = [
      {
        type: 'text',
        name: 'apiKey',
        message: 'Please enter your full-access DatoCMS key',
        validate: (v) => v.length >= 10,
      },
    ];

    const response = await prompts(questions);
    apiKey = response.apiKey;
  }

  if (!apiKey) return;

  const models = await fetch({
    apiKey,
    necessaryModels,
    ignoreSubfieldsIn,
  });

  fse.outputFileSync(output, JSON.stringify(models));
};
