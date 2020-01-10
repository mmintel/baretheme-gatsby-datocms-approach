import React from 'react';
import { Display, themes } from '@baretheme/ui';
import { render } from '../helpers';

describe('Display component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Display>{text}</Display>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Display>{text}</Display>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Display data-test="test">{text}</Display>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('is not visible when hidden', () => {
    const text = 'Test';
    const { container } = render(<Display hidden>{text}</Display>);
    expect(container.firstChild).not.toBeVisible();
  });

  it('adds the correct styles with italic', () => {
    const text = 'Test';
    const { container } = render(<Display italic>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('font-style', 'italic');
  });

  it('adds the correct styles with bold', () => {
    const text = 'Test';
    const { container } = render(<Display bold>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('font-weight', 'bold');
  });

  it('adds the correct styles with size', () => {
    const text = 'Test';
    const { container } = render(<Display size={2}>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('font-size', themes[0].fontSize(2));
  });

  it('adds the correct styles with selectable', () => {
    const text = 'Test';
    const { container, rerender } = render(<Display selectable>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('user-select', 'text');

    rerender(<Display selectable={false}>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('user-select', 'none');
  });

  it('adds the correct styles with uppercase', () => {
    const text = 'Test';
    const { container } = render(<Display uppercase>{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('text-transform', 'uppercase');
  });

  it('adds the correct styles with align', () => {
    const text = 'Test';
    const { container, rerender } = render(<Display align="left">{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('text-align', 'left');
    rerender(<Display align="center">{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('text-align', 'center');
    rerender(<Display align="right">{text}</Display>);
    expect(container.firstChild).toHaveStyleRule('text-align', 'right');
  });
});
