import React from 'react';
import PropTypes from 'prop-types';
import Icon from '@mdi/react';
import { mdiTwitter, mdiInstagram } from '@mdi/js';
import styled from '@emotion/styled';
import { Tooltip, IconBar, IconBarItem } from '@baretheme/ui';

const AccountLink = styled.a`
  display: flex;
  align-items: center;
`;

const AccountIcon = styled(Icon)`
  fill: ${(props) => props.theme.color.foreground};

  :hover,
  :focus {
    fill: ${(props) => props.theme.color.highlight};
  }
`;

const SocialAccounts = ({ items }) => {
  const getIcon = (title) => {
    const map = {
      Instagram: mdiInstagram,
      Twitter: mdiTwitter,
    };
    return map[title];
  };

  return (
    <IconBar>
      {items && items.map((item) => (
        <IconBarItem key={item.id}>
          <Tooltip content={item.title}>
            <AccountLink
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AccountIcon path={getIcon(item.title)} size={1} />
            </AccountLink>
          </Tooltip>
        </IconBarItem>
      ))}
    </IconBar>
  );
};

SocialAccounts.defaultProps = {
  items: [],
};

SocialAccounts.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string,
  })),
};

export default SocialAccounts;
