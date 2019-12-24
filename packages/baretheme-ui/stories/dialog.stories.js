import React from 'react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import Dialog from '../components/dialog';

export default {
  title: 'Components.Dialog',
};

export const Simple = () => (
  <Dialog isOpen={boolean('isOpen', true)} onClose={action('onClose')}>
    Test
  </Dialog>
);
