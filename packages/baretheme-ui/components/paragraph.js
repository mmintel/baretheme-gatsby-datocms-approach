import { Display } from '@baretheme/ui';
import styled from '@emotion/styled';
import React from 'react';
import PropTypes from 'prop-types';

const StyledParagraph = styled(Display)`
`;

const Paragraph = ({ as, ...props }) => <StyledParagraph as={as} {...props} />;

Paragraph.defaultProps = {
  as: 'p',
};

Paragraph.propTypes = {
  as: PropTypes.elementType,
};

export default Paragraph;
