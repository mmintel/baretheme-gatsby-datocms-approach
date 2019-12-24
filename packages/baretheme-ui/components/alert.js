import styled from '@emotion/styled';

export default styled.div`
  padding: ${(props) => props.theme.spacing(0)};
  border: 2px dashed ${(props) => props.theme.color.accent};
  border-radius: ${(props) => props.theme.radius(1)};
`;
