import React from 'react';
import { Footer } from '@baretheme/ui';
import { render } from '../helpers';

describe('Footer component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Footer>{text}</Footer>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Footer>{text}</Footer>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Footer data-test="test">{text}</Footer>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });
});
