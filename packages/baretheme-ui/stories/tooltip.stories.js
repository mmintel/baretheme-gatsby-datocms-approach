import React from 'react';
import { select, boolean } from '@storybook/addon-knobs';
import Tooltip from '../components/tooltip';

export default {
  title: 'Components/Tooltip',
};

const placements = ['top', 'bottom', 'left', 'right'].reduce(
  (acc, basePlacement) => acc.concat(basePlacement, `${basePlacement}-start`, `${basePlacement}-end`),
  [],
);

export const manual = () => (
  <Tooltip
    content="I'm a tooltip"
    placement={select('placement', placements, 'top')}
    visible={boolean('visible', true)}
    interactive={boolean('interactive', true)}
    hideOnClick={boolean('hideOnClick', false)}
  >
    <span>Tooltip</span>
  </Tooltip>
);

export const automatic = () => (
  <Tooltip content="I'm a tooltip">
    <span>Tooltip</span>
  </Tooltip>
);
