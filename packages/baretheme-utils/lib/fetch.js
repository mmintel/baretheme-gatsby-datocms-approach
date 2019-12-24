const { exportModels, extractModels, removeModels } = require('@mmintel/datocms-tools');
const { flatten } = require('lodash');

module.exports = async function ({ apiKey, necessaryModels, ignoreSubfieldsIn }) {
  console.info('Fetching', necessaryModels);

  if (!apiKey) return;

  let models;

  models = await exportModels({
    apiKey,
  });

  models = extractModels({
    apiKeys: necessaryModels,
    models,
  });

  if (ignoreSubfieldsIn) {
    const unnecessaryModels = flatten(ignoreSubfieldsIn.map((apiKey) => {
      const field = models.fields.find((i) => i.apiKey === apiKey);

      if (!field) return;

      return field.validators.itemsItemType.itemTypes.map((id) => {
        const itemType = models.itemTypes.find((i) => i.id === id);
        return itemType.apiKey;
      });
    }));

    models = removeModels({
      apiKeys: unnecessaryModels,
      models,
    });
  }

  return models;
};
