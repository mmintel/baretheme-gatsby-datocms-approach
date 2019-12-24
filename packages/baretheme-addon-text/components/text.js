import React from 'react';
import PropTypes from 'prop-types';
import {
  Headline, Section, Container,
} from '@baretheme/ui';
import { Markdown } from '@baretheme/gatsby-theme-baretheme';

const Text = ({ block }) => (
  <Section>
    <Container size="small">
      { block.title && (
        <Headline
          as={`h${block.headingLevel}`}
          hidden={block.hideHeading}
          align={block.align}
          size={block.headingSize}
        >{block.title}
        </Headline>
      )}
      <Markdown align={block.align}>
        {block.content}
      </Markdown>
    </Container>
  </Section>
);

Text.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    align: PropTypes.oneOf(['left', 'center', 'right']),
    headingLevel: PropTypes.number,
    headingSize: PropTypes.number,
    hideHeading: PropTypes.bool,
  }).isRequired,
};

export default Text;
