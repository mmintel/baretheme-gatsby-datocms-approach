import React from 'react';
import styled from '@emotion/styled';

const IconBarContext = React.createContext();

function useIconBarContext() {
  const context = React.useContext(IconBarContext);
  if (!context) {
    throw new Error(
      'IconBar compound components cannot be rendered outside the IconBar component',
    );
  }
  return context;
}
const StyledIconBar = styled.ul`
  display: flex;
  align-items: center;
`;

const IconBar = (props) => (
  <IconBarContext.Provider value={{}}>
    <StyledIconBar {...props} />
  </IconBarContext.Provider>
);

const StyledIconBarItem = styled.li`
  display: block;

  &:not(:last-child) {
    margin-right: 0.5rem;
  }
`;

const IconBarItem = (props) => {
  useIconBarContext();
  return <StyledIconBarItem {...props} />;
};

IconBarItem.displayName = 'IconBar.Item';
IconBar.Item = IconBarItem;

export default IconBar;
