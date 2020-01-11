import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Headline } from '@baretheme/ui';
import withSpacing from '../hocs/with-spacing';

const ListContext = React.createContext();

function useListContext() {
  const context = React.useContext(ListContext);
  if (!context) {
    throw new Error(
      'List compound components cannot be rendered outside the List component',
    );
  }
  return context;
}

const List = withSpacing(({
  align, children, type, tight, ...props
}) => {
  const value = React.useMemo(() => ({ align, type, tight }), [align, type, tight]);
  return (
    <ListContext.Provider value={value}>
      <div {...props}>
        {children}
      </div>
    </ListContext.Provider>
  );
});

List.defaultProps = {
  align: 'left',
  type: undefined,
};

List.propTypes = {
  type: PropTypes.oneOf(['ordered', 'unordered']),
  align: PropTypes.oneOf(['left', 'center', 'right']),
  children: PropTypes.node.isRequired,
};

const StyledListHead = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.color.faded};
  padding-top: ${(props) => props.theme.spacing(-1)};
  padding-bottom: ${(props) => props.theme.spacing(-1)};
`;

const ListHead = (props) => (
  <StyledListHead {...props} />
);

const ListTitle = ({ children }) => {
  useListContext();
  return (
    <Headline size={-2} bold uppercase>
      {children}
    </Headline>
  );
};

ListTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

const StyledListBody = styled.ul`
  ${(props) => props.type && css`
    list-style: ${(props.type === 'ordered' ? 'decimal' : 'disc')};
  `}
`;

const ListBody = (props) => {
  const { type } = useListContext();
  return <StyledListBody type={type} {...props} />;
};

const StyledListItem = styled.li`
  display: block;

  ${(props) => !props.tight && css`
    &:not(:last-child) {
      border-bottom: 1px solid ${props.theme.color.faded};
    }
  `}
`;

const ListItem = (props) => {
  const { tight } = useListContext();
  return <StyledListItem tight={tight} {...props} />;
};

const activeStyles = (props) => css`
  font-weight: bold;
  color: ${props.theme.color.highlight};
  cursor: auto;
`;

const StyledListItemText = styled.div`
  display: block;
  padding-top: ${(props) => props.theme.spacing(0)};
  padding-bottom: ${(props) => props.theme.spacing(0)};
  text-align: ${(props) => props.align};

  ${(props) => props.tight && css`
    padding-top: ${props.theme.spacing(-2)};
    padding-bottom: ${props.theme.spacing(-2)};
  `}

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

  ${(props) => props.type && css`
    display: list-item;
    margin-left: 1rem;
    list-style: ${(props.type === 'ordered' ? 'decimal' : 'disc')};
  `}
`;

const ListItemText = ({
  children, active, ...props
}) => {
  const { type, tight, align } = useListContext();
  return (
    <StyledListItemText tight={tight} align={align} type={type} active={active} {...props}>
      {children}
    </StyledListItemText>
  );
};

ListItemText.defaultProps = {
  active: false,
};

ListItemText.propTypes = {
  active: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

ListHead.displayName = 'List.Head';
ListTitle.displayName = 'List.Title';
ListBody.displayName = 'List.Body';
ListItem.displayName = 'List.Item';
ListItemText.displayName = 'List.ItemText';

List.Head = ListHead;
List.Title = ListTitle;
List.Body = ListBody;
List.Item = ListItem;
List.ItemText = ListItemText;

export default List;
