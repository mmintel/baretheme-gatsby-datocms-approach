import React from 'react';
import { colors } from '@baretheme/gatsby-theme-baretheme';
import { number, select } from '@storybook/addon-knobs';
import { mdiMenu } from '@mdi/js';
import { action } from '@storybook/addon-actions';
import Icon from '../components/icon';

export default {
  title: 'Components/Icon',
};

export const withoutAction = () => <Icon size={number('size', 1)} color={select('color', ['inherit', ...colors])} path={mdiMenu} />;

export const withClick = () => (
  <Icon onClick={action('click')} size={number('size', 1)} color={select('color', ['inherit', ...colors])} path={mdiMenu} />
);
