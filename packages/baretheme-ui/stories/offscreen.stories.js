import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import Offscreen from '../components/offscreen';

export default {
  title: 'Components/Offscreen',
};

export const simple = () => (
  <Offscreen
    onResize={action('onResize')}
    onClose={action('onClose')}
    isOpen={boolean('isOpen', true)}
    position={select('position', ['top', 'right'], 'right')}
  >
    Content
  </Offscreen>
);
