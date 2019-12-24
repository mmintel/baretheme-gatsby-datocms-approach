import React from 'react';
import { boolean } from '@storybook/addon-knobs';
import { Flip, Card } from '@baretheme/ui';

export default {
  title: 'Components.Flip',
};

export const simple = () => (
  <Flip flipped={boolean('flipped', false)} front={<span>Front</span>} back={<span>Back</span>} />
);

export const withCard = () => (
  <Flip
    flipped={boolean('flipped', false)}
    front={(
      <Card>
        <Card.Body>
          Front
        </Card.Body>
      </Card>
    )}
    back={(
      <Card>
        <Card.Body>
          Back
        </Card.Body>
      </Card>
    )}
  />
);

export const withDifferentHeights = () => (
  <Flip
    flipped={boolean('flipped', false)}
    front={(
      <Card>
        <Card.Head>The Front</Card.Head>
        <Card.Body>
          Front has title and body to get a different height.
        </Card.Body>
      </Card>
    )}
    back={(
      <Card>
        <Card.Body>
          Back
        </Card.Body>
      </Card>
    )}
  />
);
