import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { render } from '@testing-library/react';
import { themes } from '@baretheme/ui';
import { ThemeProvider } from 'emotion-theming';

const Wrapper = ({ children }) => (
  <ThemeProvider theme={themes[0]}>
    {children}
  </ThemeProvider>
);

Wrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

const customRender = (ui, options) => render(ui, { wrapper: Wrapper, ...options });

export { customRender as render };

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
