import styled from '@emotion/styled';
import { Display } from '@baretheme/ui';

export default styled(Display)`
  color: ${(props) => props.theme.color.accent};
  cursor: pointer;

  a {
    user-select: text;
  }

  :hover,
  :focus {
    color: ${(props) => props.theme.emphasize(props.theme.color.accent)};
  }
`;
