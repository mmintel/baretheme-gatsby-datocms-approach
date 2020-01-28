import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const StyledMedia = styled.div`
  box-shadow: ${(props) => props.theme.shadow(4)};
  border-radius: ${(props) => props.theme.radius(1)};
  overflow: hidden;
`;

const Caption = styled.figcaption`
  text-align: center;
  color: ${(props) => props.theme.color.dimmed};
  margin-top: ${(props) => props.theme.spacing(-1)};
  font-size: ${(props) => props.theme.fontSize(-2)};
`;

const Media = ({ caption, children, ...props }) => (
  <figure {...props}>
    <StyledMedia>
      {children}
    </StyledMedia>
    { caption && (
      <Caption>{ caption }</Caption>
    )}
  </figure>
);

Media.defaultProps = {
  caption: undefined,
};

Media.propTypes = {
  caption: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Media;
