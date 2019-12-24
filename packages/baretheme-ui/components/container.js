import styled from '@emotion/styled';
import { css } from '@emotion/core';

export default styled.div`
  padding-left: 2rem;
  padding-right: 2rem;
  max-width: 1400px;
  min-width: 320px;
  width: 100%;
  margin: 0 auto;

  ${(props) => props.size === 'small' && css`
    width: 75%;
    max-width: 800px;
    min-width: 320px;
  `}
`;
