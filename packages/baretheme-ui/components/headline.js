import { Display } from '@baretheme/ui';
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';

const StyledHeadline = styled(Display)`
  font-weight: bold;
  color: ${(props) => props.theme.color.highlight};
`;

const Headline = ({ as, ...props }) => <StyledHeadline as={as} {...props} />;

Headline.defaultProps = {
  as: 'h2',
};

Headline.propTypes = {
  as: PropTypes.elementType,
};

export default Headline;
