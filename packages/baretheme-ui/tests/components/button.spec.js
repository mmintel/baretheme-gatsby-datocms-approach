import React from 'react';
import { Button, themes } from '@baretheme/ui';
import { render } from '../helpers';

describe('Button component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Button>{text}</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Button>{text}</Button>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Button data-test="test">{text}</Button>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('adds correct styles with a size', () => {
    const text = 'Test';
    const size = 2;
    const { container } = render(<Button size={size}>{text}</Button>);
    expect(container.firstChild).toHaveStyleRule('font-size', themes[0].fontSize(size));
  });

  it('adds correct styles with a type', () => {
    const text = 'Test';
    const { container } = render(<Button type="primary">{text}</Button>);
    expect(container.firstChild).toHaveStyleRule('background-color', themes[0].palettes.primary.background);
  });

  it('renders correctly with a nativeType', () => {
    const text = 'Test';
    const { container } = render(<Button nativeType="input">{text}</Button>);
    expect(container.firstChild).toHaveAttribute('type', 'input');
  });
});
