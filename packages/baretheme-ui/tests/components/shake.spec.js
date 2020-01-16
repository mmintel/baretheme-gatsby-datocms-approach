import React from 'react';
import { Shake } from '@baretheme/ui';
import { render } from '../helpers';

describe('Shake component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Shake>{text}</Shake>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Shake>{text}</Shake>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Shake data-test="test">{text}</Shake>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it.skip('animates correctly', () => {
    const text = 'Test';
    const { getByText } = render(<Shake animate>{text}</Shake>);
    const node = getByText(text);
    expect(node).toHaveStyle(`
      transform: rotate(0deg)
    `);
  });
});
