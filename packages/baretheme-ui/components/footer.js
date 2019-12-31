import React from 'react';
import styled from '@emotion/styled';
import { Container, Display } from '@baretheme/ui';

const FooterWrapper = styled.footer`
  margin-top: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Footer = ({ copyright, children, ...props }) => (
  <FooterWrapper {...props}>
    <Container>
      <Display align="center" as="div" mb={1} size={-1}>{copyright}</Display>
      {children}
    </Container>
  </FooterWrapper>
);

export default Footer;
