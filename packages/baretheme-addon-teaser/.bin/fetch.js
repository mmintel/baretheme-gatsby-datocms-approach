#!/usr/bin/env node
const { fetchSave } = require('@baretheme/utils');

const necessaryModels = ['teaser'];

fetchSave({ necessaryModels });