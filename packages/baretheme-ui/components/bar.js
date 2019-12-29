import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

const BarContext = React.createContext();

function useBarContext() {
  const context = React.useContext(BarContext);
  if (!context) {
    throw new Error(
      'Bar compound components cannot be rendered outside the Bar component',
    );
  }
  return context;
}

const StyledBar = styled.ul`
  display: flex;
  align-items: center;
  justify-content: ${(props) => {
    const attrs = {
      left: 'flex-start',
      center: 'center',
      right: 'flex-end',
    };
    return attrs[props.align];
  }};
  margin-left: ${(props) => props.flush && `-${props.theme.spacing(1)}`};
  margin-right: ${(props) => props.flush && `-${props.theme.spacing(1)}`};
`;

const Bar = ({ align, flush, children }) => {
  const value = React.useMemo(() => ({ align }), [align]);
  return (
    <BarContext.Provider value={value}>
      <StyledBar flush={flush} align={align}>
        {children}
      </StyledBar>
    </BarContext.Provider>
  );
};

Bar.defaultProps = {
  flush: false,
  align: 'left',
};

Bar.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  flush: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const StyledBarItem = styled.li`
  display: block;
  flex: ${(props) => props.align !== 'center' && 1};
`;

const BarItem = ({ children }) => {
  const { align } = useBarContext();
  return <StyledBarItem align={align}>{children}</StyledBarItem>;
};

BarItem.propTypes = {
  children: PropTypes.node.isRequired,
};

const activeStyles = (props) => css`
  font-weight: bold;
  color: ${props.theme.color.highlight};
  cursor: auto;
`;

const StyledBarItemText = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && !['active'].includes(prop),
})`
  display: block;
  padding-left: ${(props) => props.theme.spacing(1)};
  padding-right: ${(props) => props.theme.spacing(1)};

  ${(props) => (props.to || props.onClick) && css`
    cursor: pointer;

    :hover {
      color: ${props.theme.color.highlight};
    }
  `}

  &.active {
    ${activeStyles}
  }

  ${(props) => props.active && activeStyles}
`;

const BarItemText = ({ active, children, ...props }) => {
  useBarContext();
  return <StyledBarItemText active={active} {...props}>{children}</StyledBarItemText>;
};

BarItemText.defaultProps = {
  active: false,
};

BarItemText.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

BarItem.displayName = 'Bar.Item';
BarItemText.displayName = 'Bar.ItemText';

Bar.Item = BarItem;
Bar.ItemText = BarItemText;

export default Bar;
