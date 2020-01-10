import React from 'react';
import { mdiMenu, mdiAccount } from '@mdi/js';
import { IconBar } from '@baretheme/ui';
import Icon from '../components/icon';

export default {
  title: 'Components.IconBar',
};

export const simple = () => (
  <IconBar>
    <IconBar.Item>
      <Icon path={mdiMenu} />
    </IconBar.Item>
    <IconBar.Item>
      <Icon path={mdiAccount} />
    </IconBar.Item>
  </IconBar>
);
