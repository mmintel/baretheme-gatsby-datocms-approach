#!/usr/bin/env node
const { fetchSave } = require('@baretheme/utils');

const necessaryModels = ['document', 'collection', 'layout'];
const ignoreSubfieldsIn = ['blocks', 'before', 'after'];

fetchSave({ necessaryModels, ignoreSubfieldsIn });