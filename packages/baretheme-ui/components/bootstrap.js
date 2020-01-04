import React from 'react';
import { Global, css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const Bootstrap = () => {
  const theme = useTheme();
  return (
    <Global styles={css`
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
      display: block;
    }
    /* HTML5 hidden-attribute fix for newer browsers */
    *[hidden] {
      display: none;
    }
    body {
      line-height: 1;
    }
    ol, ul {
      list-style: none;
    }
    blockquote, q {
      quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
      content: '';
      content: none;
    }
    table {
      border-collapse: collapse;
      border-spacing: 0;
    }
    /* http://www.paulirish.com/2012/box-sizing-border-box-ftw/ (2015/04/28)*/
    html {
      box-sizing: border-box;
    }
    *, *:before, *:after {
      box-sizing: inherit;
    }
    /* Additional resets */
    a {
      text-decoration: none;
      color: inherit;
    }
    button {
      border: none;
      margin: 0;
      padding: 0;
      width: auto;
      overflow: visible;
      background: transparent;
      color: inherit;
      font: inherit;
      text-align: inherit;
      outline: none;
      line-height: inherit;
      -webkit-appearance: none;
    }
    /* Fix antialiasing */
    *, *:before, *:after {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    /* Disable user select on everything but texts */
    *, *:before, *:after {
      user-select: none;
    }
    p, h1, h2, h3, h4, h5, h6, blockquote, pre, ul, ol, li, table, tr, th, td, input, textarea {
      user-select: text;
    }

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
