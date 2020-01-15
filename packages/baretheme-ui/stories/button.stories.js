import React from 'react';
import { action } from '@storybook/addon-actions';
import { number, select } from '@storybook/addon-knobs';
import { palettes } from '@baretheme/gatsby-theme-baretheme';
import Button from '../components/button';

export default {
  title: 'Components/Button',
};

export const simple = () => <Button onClick={action('click')} size={number('size', 0)} palett={select('palett', ['default', ...palettes], 'default')}>Text</Button>;
