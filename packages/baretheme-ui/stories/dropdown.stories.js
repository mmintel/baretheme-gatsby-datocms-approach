import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import Dropdown from '../components/dropdown';

export default {
  title: 'Components.Dropdown',
};

export const automatic = () => (
  <Dropdown content="I'm a tooltip">
    <span>Dropdown</span>
  </Dropdown>
);

export const manual = () => (
  <Dropdown
    content="I'm a dropdown"
    visible={boolean('visible', true)}
    hideOnClick={boolean('hideOnClick', false)}
  >
    <span>Dropdown</span>
  </Dropdown>
);
