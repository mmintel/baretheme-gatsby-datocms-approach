import React from 'react';
import { Header } from '@baretheme/ui';
import { render } from '../helpers';

describe('Header component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Header>{text}</Header>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Header>{text}</Header>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Header data-test="test">{text}</Header>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });
});
