import React from 'react';
import styled from '@emotion/styled';

const TilesContext = React.createContext();

function useTilesContext() {
  const context = React.useContext(TilesContext);
  if (!context) {
    throw new Error(
      'Tiles compound components cannot be rendered outside the Tiles component',
    );
  }
  return context;
}
const StyledTiles = styled.ul`
  display: flex;
  flex-wrap: wrap;
`;

const Tiles = (props) => (
  <TilesContext.Provider value={{}}>
    <StyledTiles {...props} />
  </TilesContext.Provider>
);

const StyledTilesItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 calc(25% - 10px);
  margin: ${(props) => props.theme.spacing(0)};
  background: ${(props) => props.theme.color.lowered};
  padding: 10%;

  &:after{
    content: '';
    display: block;
    padding-bottom: 100%;
  }
`;

const TilesItem = (props) => {
  useTilesContext();
  return <StyledTilesItem {...props} />;
};

TilesItem.displayName = 'Tiles.Item';
Tiles.Item = TilesItem;

export default Tiles;
