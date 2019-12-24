import React from 'react';
import Icon from '@mdi/react';
import { mdiTwitter, mdiInstagram } from '@mdi/js';
import styled from '@emotion/styled';
import Tooltip from './tooltip';
import IconBar from './icon-bar';

const AccountLink = styled.a`
  display: block;
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
      {items
        && items.map((item) => (
          <Tooltip key={item.id} content={item.title}>
            <AccountLink
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <AccountIcon path={getIcon(item.title)} size={1} />
            </AccountLink>
          </Tooltip>
        ))}
    </IconBar>
  );
};

export default SocialAccounts;
