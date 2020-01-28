import React from 'react';
import { select } from '@storybook/addon-knobs';
import Newsletter from '../components/newsletter';

export default {
  title: 'Components.Newsletter',
};

export const simple = () => <Newsletter result={select('result', [undefined, 'success', 'error', undefined])} block />;
