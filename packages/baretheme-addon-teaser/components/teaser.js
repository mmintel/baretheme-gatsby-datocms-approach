import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Container, Headline } from '@baretheme/ui';

const TeaserWrapper = styled.div`
  ${(props) => css`
    background-color: ${props.theme.backgroundColor};
  `}
`;

const Teaser = ({ block }) => (
  <TeaserWrapper>
    <Container>
      <Headline size={4}>{block.title}</Headline>
    </Container>
  </TeaserWrapper>
);

Teaser.propTypes = {
  block: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
};

export default Teaser;
