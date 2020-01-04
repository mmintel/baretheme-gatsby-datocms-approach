import React from 'react';
import PropTypes from 'prop-types';
import UnregisteredBlock from './unregistered-block';

let components = [];

try {
  // eslint-disable-next-line
  components = require('../../.cache/addons').default.components;
} catch (e) {
  components = [];
}

const Blocks = ({ blocks }) => (
  <>
    {blocks.map((block) => {
      const addonComponent = components.find((c) => c.name === block.type);
      if (addonComponent) {
        const Component = addonComponent.component;
        return <Component block={block} key={block.id} />;
      }
      return (
        <UnregisteredBlock key={block.type} block={block} />
      );
    })}
  </>
);

Blocks.defaultProps = {
  blocks: [],
};

Blocks.propTypes = {
  blocks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
  })),
};

export default Blocks;
