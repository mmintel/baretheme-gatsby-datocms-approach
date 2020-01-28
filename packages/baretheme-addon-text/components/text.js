import React from 'react';
import PropTypes from 'prop-types';
import {
  Section, Container,
} from '@baretheme/ui';
import { Markdown } from '@baretheme/gatsby-theme-baretheme';

const Text = ({ item }) => (
  <Section>
    <Container size="small">
      <Markdown align={item.align}>
        {item.content}
      </Markdown>
    </Container>
  </Section>
);

Text.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
  }).isRequired,
};

export default Text;
