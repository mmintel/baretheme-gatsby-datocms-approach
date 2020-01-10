import React from 'react';
import { Headline } from '@baretheme/ui';
import { render } from '../helpers';

describe('Headline component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Headline>{text}</Headline>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Headline>{text}</Headline>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Headline data-test="test">{text}</Headline>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('renders as specified element', () => {
    const text = 'Test';
    const type = 'h3';
    const { container } = render(<Headline as={type}>{text}</Headline>);
    expect(container).toContainElement(container.querySelector(type));
  });
});
