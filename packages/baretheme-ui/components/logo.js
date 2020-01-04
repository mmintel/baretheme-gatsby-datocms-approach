import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledLogo = styled.div`
  display: block;
  width: auto;
  height: 2.5rem;

  img {
    height: 2.5rem;
  }

  svg {
    height: 2.5rem;
  }
`;

const Logo = ({ logo }) => (
  <StyledLogo>
    {logo.meta.format === 'svg' ? (
      <div dangerouslySetInnerHTML={{ __html: logo.file }} />
    ) : (
      <img src={logo.file} alt={logo.meta.alt} />
    )}
  </StyledLogo>
);

Logo.propTypes = {
  logo: PropTypes.shape({
    file: PropTypes.string,
    meta: PropTypes.shape({
      format: PropTypes.string,
      alt: PropTypes.string,
    }),
  }).isRequired,
};

export default Logo;
