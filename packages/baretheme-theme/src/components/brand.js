import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import Link from './link';
import Logo from './logo';
import SocialAccounts from './social-accounts';

const StyledBrand = styled.div`
  display: flex;
  align-items: center;
`;

const BrandAccounts = styled.div`
  border-left: 1px solid ${(props) => props.theme.color.dimmed};
  padding-left: 1rem;
  margin-left: 1rem;
`;

const Brand = ({ socialAccounts }) => (
  <StyledBrand>
    <Link to="/">
      <Logo />
    </Link>
    { socialAccounts.length > 0 && (
      <BrandAccounts>
        <SocialAccounts items={socialAccounts} />
      </BrandAccounts>
    )}
  </StyledBrand>
);

Brand.defaultProps = {
  socialAccounts: [],
};

Brand.propTypes = {
  socialAccounts: PropTypes.arrayOf(PropTypes.object),
};

export default Brand;
