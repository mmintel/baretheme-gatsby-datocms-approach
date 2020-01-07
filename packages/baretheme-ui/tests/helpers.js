import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
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

export function expectRenderError(element, expectedError) {
  // Noop error boundary for testing.
  class TestBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { didError: false };
    }

    componentDidCatch() {
      this.setState({ didError: true });
    }

    render() {
      return this.state.didError ? null : this.props.children;
    }
  }

  TestBoundary.propTypes = {
    children: PropTypes.node.isRequired,
  };

  // Record all errors.
  const topLevelErrors = [];
  function handleTopLevelError(event) {
    topLevelErrors.push(event.error);
    // Prevent logging
    event.preventDefault();
  }

  const div = document.createElement('div');
  window.addEventListener('error', handleTopLevelError);
  try {
    ReactDOM.render(
      <TestBoundary>
        {element}
      </TestBoundary>,
      div,
    );
  } finally {
    window.removeEventListener('error', handleTopLevelError);
  }

  expect(topLevelErrors.length).toBe(1);
  expect(topLevelErrors[0].message).toContain(expectedError);
}
