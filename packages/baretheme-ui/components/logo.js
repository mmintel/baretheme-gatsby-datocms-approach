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

const Logo = ({
  src, alt, svg, ...props
}) => (
  <StyledLogo {...props}>
    {svg ? (
      // eslint-disable-next-line react/no-danger
      <div data-testid="svgContainer" dangerouslySetInnerHTML={{ __html: src }} />
    ) : (
      <img data-testid="image" src={src} alt={alt} />
    )}
  </StyledLogo>
);

Logo.defaultProps = {
  src: '',
  svg: false,
  alt: '',
};

Logo.propTypes = {
  src: PropTypes.string,
  svg: PropTypes.bool,
  alt: PropTypes.string,
};

export default Logo;
