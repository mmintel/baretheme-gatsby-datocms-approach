import React from 'react';
import reset from 'styled-reset-advanced';
import { Global, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const Bootstrap = () => {
  const theme = useTheme();
  return (
    <Global styles={css`
    ${reset}

    *:focus {
      outline: none;
    }

    html {
      font-size: 14px;
    }

    @media screen and (min-width: 320px) {
      html {
        font-size: calc(14px + 10 * ((100vw - 320px) / 680));
      }
    }
    @media screen and (min-width: 1000px) {
      html {
        font-size: 22px;
      }
    }

    body {
      margin: 0;
      padding: 0;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
      color: ${theme.color.foreground};
      background-color: ${theme.color.background};
      font-size: ${theme.fontSize(0)};
      line-height: ${theme.lineHeight(0)};
    }
  `}
    />
  );
};
export default Bootstrap;
