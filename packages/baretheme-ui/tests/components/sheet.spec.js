import React from 'react';
import { Sheet } from '@baretheme/ui';
import { render } from '../helpers';

describe('Sheet component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Sheet>{text}</Sheet>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Sheet>{text}</Sheet>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Sheet data-test="test">{text}</Sheet>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('sets correct styles when closed', () => {
    const text = 'Test';
    const { getByText } = render(<Sheet position="bottom">{text}</Sheet>);
    const node = getByText(text);
    expect(node).toHaveStyle(`
      transform: translateX(0px) translateY(0px);
    `);
  });

  it('sets correct styles when open', () => {
    const text = 'Test';
    const { getByText } = render(<Sheet position="bottom" isOpen>{text}</Sheet>);
    const node = getByText(text);
    expect(node).toHaveStyle(`
      transform: translateX(0px) translateY(-100px);
    `);
  });
});
