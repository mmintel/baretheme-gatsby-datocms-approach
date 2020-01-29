import { Display } from '@baretheme/ui';
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';

const StyledHeadline = styled(Display)`
  font-weight: bold;
  line-height: ${(props) => props.theme.lineHeight(-1)};
  color: ${(props) => props.theme.color.highlight};
  margin-bottom: ${(props) => props.theme.spacing(0)}
`;

const Headline = ({ as, ...props }) => <StyledHeadline as={as} {...props} />;

Headline.defaultProps = {
  as: 'h2',
};

Headline.propTypes = {
  as: PropTypes.elementType,
};

export default Headline;
