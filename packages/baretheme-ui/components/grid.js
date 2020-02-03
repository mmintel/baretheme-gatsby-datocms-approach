import React from 'react';
import styled from '@emotion/styled';

const GridContext = React.createContext();

const margin = 1;

function useGridContext() {
  const context = React.useContext(GridContext);
  if (!context) {
    throw new Error(
      'Grid compound components cannot be rendered outside the Grid component',
    );
  }
  return context;
}
const StyledGrid = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Grid = (props) => (
  <GridContext.Provider value={{}}>
    <StyledGrid {...props} />
  </GridContext.Provider>
);

const StyledGridItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${margin}px;
  background: ${(props) => props.theme.color.raised};
  padding: ${(props) => props.theme.spacing(0)};
  width: calc(50% - ${margin * 2}px);

  ${(props) => props.theme.breakpoint('small')} {
    width: calc((100% / 3) - ${margin * 2}px);
  }

  ${(props) => props.theme.breakpoint('medium')} {
    width: calc(20% - ${margin * 2}px);
  }

  &:after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const GridItem = React.forwardRef((props, ref) => {
  useGridContext();
  return <StyledGridItem ref={ref} {...props} />;
});

GridItem.displayName = 'Grid.Item';
Grid.Item = GridItem;

export default Grid;
