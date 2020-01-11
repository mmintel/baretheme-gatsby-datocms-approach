import React from 'react';
import { Logo } from '@baretheme/ui';
import { render } from '../helpers';

describe('Logo component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Logo />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes props', () => {
    const { container } = render(<Logo data-test="test" />);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('renders as image', () => {
    const { getByTestId } = render(<Logo src="foo" />);
    const node = getByTestId('image');
    expect(node).toBeInTheDocument();
  });

  it('renders as svg', () => {
    const { getByTestId } = render(<Logo src="foo" svg />);
    const node = getByTestId('svgContainer');
    expect(node).toBeInTheDocument();
  });
});
