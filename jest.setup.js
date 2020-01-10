import '@testing-library/jest-dom/extend-expect';
import { matchers } from 'jest-emotion';

expect.extend(matchers);

// START Throw error on wrong propTypes validation
const originalConsoleError = global.console.error;
beforeEach(() => {
  global.console.error = (...args) => {
    const propTypeFailures = [/Failed prop type/, /Warning: Received/];

    if (propTypeFailures.some((p) => p.test(args[0]))) {
      throw new Error(args[0]);
    }

    originalConsoleError(...args);
  };
});
// END Throw error on wrong propTypes validation

// START Tippy.js needs this
global.document.createRange = () => ({
  setStart: () => {},
  setEnd: () => {},
  commonAncestorContainer: {
    nodeName: 'BODY',
    ownerDocument: document,
  },
});
// END Tippy.js needs this
