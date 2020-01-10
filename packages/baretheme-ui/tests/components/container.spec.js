import React from 'react';
import { Container } from '@baretheme/ui';
import { render } from '../helpers';

describe('Container component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Container>{text}</Container>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Container>{text}</Container>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Container data-test="test">{text}</Container>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('sets correct styles with size', () => {
    const text = 'Test';
    const { container } = render(<Container size="small">{text}</Container>);
    expect(container.firstChild).toHaveStyleRule('max-width', '800px');
    expect(container.firstChild).toHaveStyleRule('min-width', '320px');
  });
});
