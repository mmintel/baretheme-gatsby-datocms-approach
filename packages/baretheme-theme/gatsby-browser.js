import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'emotion-theming';
import { ViewportProvider } from '@baretheme/ui';
import UIContext, { UIProvider } from './src/context/ui';
import config from './config';

const RootWrapper = ({ element }, themeOptions) => (
  <ViewportProvider>
    <UIProvider config={{ ...config, ...themeOptions }}>
      <UIContext.Consumer>
        {(ctx) => (
          <ThemeProvider theme={ctx.theme}>
            {element}
          </ThemeProvider>
        )}
      </UIContext.Consumer>
    </UIProvider>
  </ViewportProvider>
);

RootWrapper.propTypes = {
  element: PropTypes.element.isRequired,
};

export const wrapRootElement = RootWrapper;
