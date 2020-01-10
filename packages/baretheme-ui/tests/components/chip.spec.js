import React from 'react';
import { Chip, themes } from '@baretheme/ui';
import { render } from '../helpers';

describe('Chip component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Chip>{text}</Chip>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Chip>{text}</Chip>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Chip data-test="test">{text}</Chip>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('sets the correct size', () => {
    const text = 'Test';
    const size = 1;
    const { getByText } = render(<Chip size={size}>{text}</Chip>);
    const node = getByText(text);
    expect(node).toHaveStyleRule('font-size', themes[0].fontSize(size));
  });
});
