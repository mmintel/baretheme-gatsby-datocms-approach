import React from 'react';
import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';
import List from '../components/list';

export default {
  title: 'Components/List',
};

export const single = () => (
  <List align={select('align', ['left', 'center', 'right'], 'left')}>
    <List.Body>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </List.ItemText>
      </List.Item>
    </List.Body>
  </List>
);

export const multiple = () => (
  <List align={select('align', ['left', 'center', 'right'], 'left')}>
    <List.Body>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </List.ItemText>
      </List.Item>
    </List.Body>
  </List>
);

export const withHead = () => (
  <List align={select('align', ['left', 'center', 'right'], 'left')}>
    <List.Head>
      <List.Title>This is the head</List.Title>
    </List.Head>
    <List.Body>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </List.ItemText>
      </List.Item>
    </List.Body>
  </List>
);

export const withActiveText = () => (
  <List align={select('align', ['left', 'center', 'right'], 'left')}>
    <List.Body>
      <List.Item>
        <List.ItemText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText active>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
          eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
          voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText>
          At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
          gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </List.ItemText>
      </List.Item>
    </List.Body>
  </List>
);

export const withLinks = () => (
  <List align={select('align', ['left', 'center', 'right'], 'left')}>
    <List.Body>
      <List.Item>
        <List.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText as="a" onClick={action('click')}>
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        </List.ItemText>
      </List.Item>
      <List.Item>
        <List.ItemText as="a" onClick={action('click')}>
        At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
        </List.ItemText>
      </List.Item>
    </List.Body>
  </List>
);
