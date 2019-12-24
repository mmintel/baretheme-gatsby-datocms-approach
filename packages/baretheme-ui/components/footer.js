import React from 'react';
import styled from '@emotion/styled';
import Container from './container';

const FooterWrapper = styled.footer`
  margin-top: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Copyright = styled.div`
  text-align: center;
  margin-bottom: ${(props) => props.theme.spacing(1)};
`;

const Footer = ({ copyright, children, ...props }) => (
  <FooterWrapper {...props}>
    <Container>
      <Copyright>{copyright}</Copyright>
      {children}
    </Container>
  </FooterWrapper>
);

export default Footer;
