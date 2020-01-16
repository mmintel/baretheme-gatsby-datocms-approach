import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import isPropValid from '@emotion/is-prop-valid';

const StackContext = React.createContext();

function useStackContext() {
  const context = React.useContext(StackContext);
  if (!context) {
    throw new Error(
      'Stack compound components cannot be rendered outside the Stack component',
    );
  }
  return context;
}

const StyledStack = styled.div`
  margin-left: ${(props) => props.flush && `-${props.theme.spacing(1)}`};
  margin-right: ${(props) => props.flush && `-${props.theme.spacing(1)}`};
`;

const Stack = ({
  align, flush, children, ...props
}) => {
  const value = React.useMemo(() => ({ align }), [align]);
  return (
    <StackContext.Provider value={value}>
      <StyledStack flush={flush} {...props}>
        {children}
      </StyledStack>
    </StackContext.Provider>
  );
};

Stack.defaultProps = {
  align: 'left',
  flush: false,
};

Stack.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
  flush: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const StyledStackItem = styled.li`
  display: block;
  background-color: ${(props) => props.theme.color.faded};
  padding: ${(props) => props.theme.spacing(-1)} ${(props) => props.theme.spacing(1)};

  &:not(:last-child) {
    margin-bottom: 1px;
  }
`;

const StackItem = (props) => {
  useStackContext();
  return <StyledStackItem {...props} />;
};

const activeStyles = (props) => css`
  font-weight: bold;
  color: ${props.theme.color.highlight};
`;

const StyledStackItemText = styled('div', {
  shouldForwardProp: (prop) => isPropValid(prop) && !['active'].includes(prop),
})`
  display: block;
  padding-top: ${(props) => props.theme.spacing(0)};
  padding-bottom: ${(props) => props.theme.spacing(0)};
  text-align: ${(props) => props.align};

  ${(props) => (props.to || props.onClick) && css`
    cursor: pointer;

    :hover {
      color: ${props.theme.color.highlight};
    }
  `}

  ${(props) => props.active && activeStyles}

  &.active {
    ${activeStyles}
  }
`;

const StackItemText = ({
  children, active, ...props
}) => {
  const { align } = useStackContext();
  return (
    <StyledStackItemText align={align} active={active} {...props}>
      {children}
    </StyledStackItemText>
  );
};

StackItemText.defaultProps = {
  active: false,
};

StackItemText.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

StackItem.displayName = 'Stack.Item';
StackItemText.displayName = 'Stack.ItemText';

Stack.Item = StackItem;
Stack.ItemText = StackItemText;

export default Stack;
