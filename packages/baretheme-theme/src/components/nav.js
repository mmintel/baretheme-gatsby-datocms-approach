import React from 'react';
import PropTypes from 'prop-types';
import { List, Bar, Stack } from '@baretheme/ui';
import Types from '../types';

import LocalePath from './locale-path';
import Link from './link';


const Nav = ({
  align, flush, type, items,
}) => {
  if (type === 'bar') {
    return (
      <Bar align={align} flush={flush}>
        {items && items.map((item) => (
          <LocalePath path={item.slug} key={item.id}>
            {(localePath) => (
              <Bar.Item>
                <Bar.ItemText as={Link} to={localePath}>
                  { item.title }
                </Bar.ItemText>
              </Bar.Item>
            )}
          </LocalePath>
        ))}
      </Bar>
    );
  } if (type === 'stack') {
    return (
      <Stack align={align} flush={flush}>
        {items && items.map((item) => (
          <LocalePath path={item.slug} key={item.id}>
            {(localePath) => (
              <Stack.Item>
                <Stack.ItemText as={Link} to={localePath}>
                  { item.title }
                </Stack.ItemText>
              </Stack.Item>
            )}
          </LocalePath>
        ))}
      </Stack>
    );
  }

  return (
    <List align={align}>
      <List.Body>
        {items && items.map((item) => (
          <LocalePath path={item.slug} key={item.id}>
            {(localePath) => (
              <List.Item>
                <List.ItemText as={Link} to={localePath}>
                  { item.title }
                </List.ItemText>
              </List.Item>
            )}
          </LocalePath>
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
};

Nav.propTypes = {
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
