import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Container } from '@baretheme/ui';

const StyledBanner = styled.div`
  position: relative;
  background-color: ${(props) => props.theme.color.raised};
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => props.theme.spacing(-2)};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  border-left: 1px solid ${(props) => props.theme.color.background};
  margin-left: 1rem;
  padding-left: 1rem;
`;

const Banner = ({ actions, children, ...props }) => (
  <StyledBanner {...props}>
    <Container>
      <Content>
        {children}
        { actions && <Actions>{actions}</Actions>}
      </Content>
    </Container>
  </StyledBanner>
);

Banner.defaultProps = {
  actions: undefined,
};

Banner.propTypes = {
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Banner;
