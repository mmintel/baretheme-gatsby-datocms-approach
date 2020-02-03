import React from 'react';
import styled from '@emotion/styled';

const StyledImage = styled.img`
  max-width: 100%;
`;

const Image = React.forwardRef((props, ref) => <StyledImage ref={ref} {...props} />);

export default Image;
