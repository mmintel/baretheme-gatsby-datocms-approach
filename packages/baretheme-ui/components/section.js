import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { useViewportContext } from '@baretheme/ui';
import withSpacing from '../hocs/with-spacing';

const StyledSection = styled.section`
  &:first-of-type {
    margin-top: ${(props) => props.theme.spacing(2)};
  }
`;

const SectionWithSpacing = withSpacing(StyledSection);

const Section = ({ mt, mb, ...props }) => {
  const viewport = useViewportContext();
  return (
    <SectionWithSpacing
      mt={viewport.isLarge ? mt : mt - 1}
      mb={viewport.isLarge ? mb : mb - 1}
      {...props}
    />
  );
};

Section.defaultProps = {
  mt: 4,
  mb: 4,
};

Section.propTypes = {
  mt: PropTypes.number,
  mb: PropTypes.number,
};

export default Section;
