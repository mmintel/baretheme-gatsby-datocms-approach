import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/no-duplicates
import SyntaxHighlighter from 'react-syntax-highlighter';

// eslint-disable-next-line import/no-duplicates
import { docco } from 'react-syntax-highlighter/dist/cjs';

const CodeBlock = ({ language, value }) => (
  <SyntaxHighlighter language={language} style={docco}>
    {value}
  </SyntaxHighlighter>
);

CodeBlock.propTypes = {
  value: PropTypes.string.isRequired,
  language: PropTypes.string,
};

CodeBlock.defaultProps = {
  language: null,
};

export default CodeBlock;
