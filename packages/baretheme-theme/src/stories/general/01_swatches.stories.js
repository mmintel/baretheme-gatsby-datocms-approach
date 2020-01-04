import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { Display } from '@baretheme/ui';

export default {
  title: 'Swatches',
};

const Color = styled.div`
  margin: 0 auto;
  width: 3rem;
  height: 3rem;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.theme.radius(1)};
`;

const StyledSwatch = styled.div`
  box-shadow: ${(props) => props.theme.shadow(2)};
  width: 20%;
  margin: 0.5rem;
  font-size: 0.75rem;
  border-radius: ${(props) => props.theme.radius(1)};
  overflow: hidden;
  color: #333;
`;

const SwatchInfo = styled.ul`
  padding: 0.5rem;
  background-color: #fff;
`;

const SwatchColor = styled.div`
  padding: 0.5rem;
  background-color: white;
  background-image: linear-gradient(45deg, #ccc 25%, transparent 25%),
    linear-gradient(-45deg, #ccc 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #ccc 75%),
    linear-gradient(-45deg, transparent 75%, #ccc 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
`;

const Swatch = ({ color, name }) => (
  <StyledSwatch>
    <SwatchColor>
      <Color color={color} />
    </SwatchColor>
    <SwatchInfo>
      <li>
        <Display bold>{name}</Display>
      </li>
      <li>{color}</li>
    </SwatchInfo>
  </StyledSwatch>
);

const StyledSwatches = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Swatches = () => {
  const theme = useTheme();
  const colors = Object.keys(theme.color);
  return (
    <StyledSwatches>
      {colors.map((name) => {
        const color = theme.color[name];
        return <Swatch color={color} name={name} />;
      })}
    </StyledSwatches>
  );
};

export const all = () => <Swatches />;
