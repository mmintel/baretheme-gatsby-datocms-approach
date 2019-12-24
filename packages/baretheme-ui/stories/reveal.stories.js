import React from 'react';
import { Reveal } from '@baretheme/ui';

export default {
  title: 'Components.Reveal',
};

export const simple = () => (
  <div style={{ height: 1500 }}>
    <Reveal>
      <p style={{ marginTop: 700 }}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
      </p>
    </Reveal>
  </div>
);
