import React from 'react';
import PropTypes from 'prop-types';
import UnregisteredContent from './unregistered-content';

let components = [];
let contents = [];

try {
  // eslint-disable-next-line
  const addons = require('../../.cache/addons').default;
  components = addons.components;
  contents = addons.contents;
} catch (e) {
  contents = [];
  components = [];
}

const DatoCmsComponent = ({ item }) => {
  const addonComponent = components.find((c) => c.name === item.link.type);
  if (addonComponent) {
    const Component = addonComponent.component;
    return <Component item={item.link} />;
  }
  return <UnregisteredContent item={item.link} />;
};

DatoCmsComponent.propTypes = {
  item: PropTypes.shape({
    link: PropTypes.shape({
      type: PropTypes.string,
    }),
  }).isRequired,
};

const Content = ({ items }) => (
  <>
    {items.map((item) => {
      if (item.type === 'DatoCmsComponent') return <DatoCmsComponent item={item} key={item.id} />;
      const content = contents && contents.find((c) => c.name === item.type);
      if (content) {
        const Component = content.component;
        return <Component item={item} key={item.id} />;
      }
      return (
        <UnregisteredContent key={item.type} item={item} />
      );
    })}
  </>
);

Content.defaultProps = {
  items: [],
};

Content.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default Content;
