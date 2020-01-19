#!/usr/bin/env node
const fs = require('fs-extra');
const {
  reset,
  importModels,
  exportModels,
  exportContent,
} = require('@mmintel/datocms-tools')
const prompts = require('prompts');
const path = require('path');
const coreModels = require('@baretheme/gatsby-theme-baretheme/data/models.json');
const { uniqBy } = require('lodash');

let models = coreModels;

const gatsbyConfig = require(path.resolve(process.cwd(), 'gatsby-config.js'));
const themeOptions = gatsbyConfig.plugins.find(plugin => plugin.resolve === '@baretheme/gatsby-theme-baretheme').options;

themeOptions.plugins && themeOptions.plugins.forEach(pluginName => {
  const plugin = require(pluginName);

  if (plugin.models) {
    if (plugin.models.itemTypes) {
      models.itemTypes = [...models.itemTypes, ...plugin.models.itemTypes]
      models.itemTypes = uniqBy(models.itemTypes, 'apiKey')
    }

    if (plugin.models.fields) {
      models.fields = [...models.fields, ...plugin.models.fields]
      models.fields = uniqBy(models.fields, 'id')
    }
  }

  if (plugin.menuItems) {
    menuItems = [...menuItems, ...plugin.menuItems]
  }

  if (plugin.register) {
    plugin.register.forEach(reg => {
      reg.locations.forEach(location => {
        const fields = models.fields.filter(f => f.apiKey === location);
        fields.forEach(field => {
          const itemTypes = field.validators.itemsItemType.itemTypes;

          reg.apiKeys.forEach(apiKey => {
            const itemType = models.itemTypes.find(i => i.apiKey === apiKey);
            if (!itemTypes.find(i => i === itemType.id)) {
              itemTypes.push(itemType.id);
            }
          })
        })
      })
    })
  }
})

const questions = [
  {
    type: 'text',
    name: 'apiKey',
    message: 'Please enter your full-access DatoCMS key',
    validate: (v) => v.length >= 10
  },
  {
    type: 'confirm',
    name: 'reset',
    message: 'Would you like to reset the existing project?',
    default: false,
  }
]

const run = async function() {
  const response = await prompts(questions);
  const { apiKey } = response;
  const timestamp = new Date().toISOString().replace(/[^\w]/g, "")

  if (!apiKey) return;

  exportModels({
    apiKey,
  }).then((data) => {
    fs.outputFileSync(path.resolve(process.cwd(), `.backups/models-${timestamp}.json`), JSON.stringify(data));
  });

  exportContent({
    apiKey,
  }).then((data) => {
    fs.outputFileSync(path.resolve(process.cwd(), `.backups/content-${timestamp}.json`), JSON.stringify(data));
  });

  if (response.reset) {
    await reset({
      apiKey
    })
  }

  await importModels({
    models,
    apiKey,
  })

  console.log('All done.')
}

run();