import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Burger from '../components/burger';

export default {
  title: 'Components.Burger',
};

export const desktop = () => <Burger onToggle={action('onToggle')} isOpen={boolean('isOpen', false)} />;
