import React from 'react';
import { number, boolean, select } from '@storybook/addon-knobs';
import { colors } from '@baretheme/gatsby-theme-baretheme';
import { Display, Headline } from '@baretheme/ui';

export default {
  title: 'Components/Display',
};

export const simple = () => (
  <Display size={number('size', 0)} bold={boolean('bold', false)} color={select('color', ['inherit', ...colors])}>
    Text
  </Display>
);

export const headlines = () => (
  <div>
    <Headline size={6} as="h1">
      This is a headline
    </Headline>
    <Headline size={5} as="h2">
      This is a headline
    </Headline>
    <Headline size={4} as="h3">
      This is a headline
    </Headline>
    <Headline size={3} as="h4">
      This is a headline
    </Headline>
    <Headline size={2} as="h5">
      This is a headline
    </Headline>
    <Headline size={1} as="h6">
      This is a headline
    </Headline>
  </div>
);

export const HeadlinesWithParagraphs = () => (
  <div>
    <Headline size={6} as="h1">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
    <Headline size={5} as="h2">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
    <Headline size={4} as="h3">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
    <Headline size={3} as="h4">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
    <Headline size={2} as="h5">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
    <Headline size={1} as="h6">
      This is a headline
    </Headline>
    <Display as="p">
      Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
    </Display>
  </div>
);
