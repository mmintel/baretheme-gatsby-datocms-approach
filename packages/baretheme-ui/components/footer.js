import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from '@baretheme/ui';

const FooterWrapper = styled.footer`
  margin-top: ${(props) => props.theme.spacing(3)};
  margin-bottom: ${(props) => props.theme.spacing(3)};
`;

const Footer = ({ children, ...props }) => (
  <FooterWrapper {...props}>
    <Container>
      {children}
    </Container>
  </FooterWrapper>
);

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
