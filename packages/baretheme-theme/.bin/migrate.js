#!/usr/bin/env node
const fs = require('fs');
const {
  reset,
  importModels,
  importMenu,
  exportModels,
  exportContent,
} = require('@mmintel/datocms-tools')
const prompts = require('prompts');
const path = require('path');
const coreModels = require('../data/models.json.js');
const coreMenuItems = require('../data/menu.json.js');
const { uniqBy } = require('lodash');

let models = coreModels;
let menuItems = coreMenuItems;

const gatsbyConfig = require(path.resolve(process.cwd(), 'gatsby-config.js'));
const themeOptions = gatsbyConfig.plugins.find(plugin => plugin.resolve === '@baretheme/gatsby-theme-baretheme').options;

themeOptions.plugins.forEach(pluginName => {
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
        const field = models.fields.find(f => f.apiKey === location);
        const itemTypes = field.validators.itemsItemType.itemTypes;

        reg.apiKeys.forEach(apiKey => {
          const itemType = models.itemTypes.find(i => i.apiKey === apiKey);
          if (!itemTypes.find(i => i === itemType.id)) {
            itemTypes.push(itemType.id);
          }
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

  if (!apiKey) return;

  exportModels({
    apiKey,
  }).then((data) => {
    fs.outputFileSync(path.resolve(process.cwd(), '.backups/models.json'), JSON.stringify(data));
  });

  exportContent({
    apiKey,
  }).then((data) => {
    fs.outputFileSync(path.resolve(process.cwd(), '.backups/content.json'), JSON.stringify(data));
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

  await importMenu({
    apiKey,
    menuItems,
    models
  })

  console.log('All done.')
}

run();