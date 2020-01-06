import React from 'react';
import renderer from 'react-test-renderer';
import { themes } from '@baretheme/ui';
import { ThemeProvider } from 'emotion-theming';

export function renderWithTheme(component) {
  return renderer.create(
    <ThemeProvider theme={themes[0]}>
      {component}
    </ThemeProvider>,
  );
}
