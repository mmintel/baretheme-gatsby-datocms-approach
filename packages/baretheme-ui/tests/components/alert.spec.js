import React from 'react';
import { Alert } from '@baretheme/ui';
import { render } from '../helpers';

describe('Alert component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Alert>{text}</Alert>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Alert>{text}</Alert>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Alert data-test="test">{text}</Alert>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });
});
