import React from 'react';
import { mdiMenu, mdiAccount } from '@mdi/js';
import IconBar from '../components/icon-bar';
import IconBarItem from '../components/icon-bar-item';
import Icon from '../components/icon';

export default {
  title: 'Components.IconBar',
};

export const simple = () => (
  <IconBar>
    <IconBarItem>
      <Icon path={mdiMenu} />
    </IconBarItem>
    <IconBarItem>
      <Icon path={mdiAccount} />
    </IconBarItem>
  </IconBar>
);
