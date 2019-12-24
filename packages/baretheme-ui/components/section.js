import React from 'react';
import styled from '@emotion/styled';
import { UIContext } from '@baretheme/gatsby-theme-baretheme';
import withSpacing from '../hocs/with-spacing';

const StyledSection = styled.section`
  &:first-of-type {
    margin-top: ${(props) => props.theme.spacing(2)};
  }
`;

const ResponsiveSection = (props) => <StyledSection {...props} />;

const Section = withSpacing(({ mt, mb, ...props }) => {
  const ui = React.useContext(UIContext);
  return (
    <ResponsiveSection
      mt={ui.media.isGreaterThan('medium') ? mt : mt - 1}
      mb={ui.media.isGreaterThan('medium') ? mb : mb - 1}
      {...props}
    />
  );
});


Section.defaultProps = {
  mt: 4,
  mb: 4,
};

export default Section;
