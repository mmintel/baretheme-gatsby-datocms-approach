import React from 'react';
import PropTypes from 'prop-types';
import { Location } from '@reach/router';
import {
  Display, List, Bar, Stack,
} from '@baretheme/ui';
import Types from '../types';
import useLocalePath from '../hooks/locale-path';

import Link from './link';

const NavItem = ({
  item, text, title, path, size,
}) => {
  const ItemComponent = item;
  const TextComponent = text;
  const localePath = useLocalePath(path);
  return (
    <ItemComponent>
      <Location>
        {({ location }) => (location.pathname === localePath ? (
          <TextComponent active>
            <Display size={size}>
              { title }
            </Display>
          </TextComponent>
        ) : (
          <TextComponent as={Link} to={localePath}>
            <Display size={size}>
              { title }
            </Display>
          </TextComponent>
        ))}
      </Location>
    </ItemComponent>
  );
};

NavItem.defaultProps = {
  path: undefined,
  size: 0,
};

NavItem.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
  path: PropTypes.string,
  item: PropTypes.elementType.isRequired,
  text: PropTypes.elementType.isRequired,
};

const Nav = ({
  align, flush, type, items, size,
}) => {
  if (type === 'bar') {
    return (
      <Bar align={align} flush={flush}>
        {items && items.map((item) => (
          <NavItem
            size={size}
            item={Bar.Item}
            text={Bar.ItemText}
            key={item.id}
            title={item.title}
            path={item.slug}
          />
        ))}
      </Bar>
    );
  } if (type === 'stack') {
    return (
      <Stack align={align} flush={flush}>
        {items && items.map((item) => (
          <NavItem
            size={size}
            item={Stack.Item}
            text={Stack.ItemText}
            key={item.id}
            title={item.title}
            path={item.slug}
          />
        ))}
      </Stack>
    );
  }

  return (
    <List align={align}>
      <List.Body>
        {items && items.map((item) => (
          <NavItem
            size={size}
            item={List.Item}
            text={List.ItemText}
            key={item.id}
            title={item.title}
            path={item.slug}
          />
        ))}
      </List.Body>
    </List>
  );
};

Nav.defaultProps = {
  type: 'list',
  items: [],
  align: 'left',
  flush: false,
  size: 0,
};

Nav.propTypes = {
  size: PropTypes.number,
  type: PropTypes.oneOf(['list', 'bar', 'stack']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  flush: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: Types.id,
      slug: Types.slug,
      title: PropTypes.string,
      active: PropTypes.bool,
    }),
  ),
};

export default Nav;
