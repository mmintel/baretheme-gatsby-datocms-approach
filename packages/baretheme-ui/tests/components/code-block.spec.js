import React from 'react';
import { CodeBlock } from '@baretheme/ui';
import { render } from '../helpers';

describe('CodeBlock component', () => {
  it('renders without crashing', () => {
    const text = '<div>Test</div>';
    const { container } = render(<CodeBlock value={text} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
