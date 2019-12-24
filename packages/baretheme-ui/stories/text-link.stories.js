import React from 'react';
import { action } from '@storybook/addon-actions';
import Display, { Headline } from '../components/display';
import TextLink from '../components/text-link';

export default {
  title: 'Components.TextLink',
};

export const simple = () => <TextLink onClick={action('click')}>TextLink</TextLink>;

export const inText = () => (
  <div>
    <Headline as="h2" size={2}>
      This is a
      {' '}
      <TextLink onClick={action('click')}>headline</TextLink>
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
      {' '}
      <TextLink onClick={action('click')}>nonumy</TextLink>
      {' '}
eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
      accusam et justo duo dolores et ea rebum.
    </Display>
  </div>
);
