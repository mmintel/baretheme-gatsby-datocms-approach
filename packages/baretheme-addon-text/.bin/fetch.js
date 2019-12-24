#!/usr/bin/env node
const { fetchSave } = require('@baretheme/utils');

const necessaryModels = ['text'];

fetchSave({ necessaryModels });