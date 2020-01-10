import React from 'react';
import { Paragraph } from '@baretheme/ui';
import { render } from '../helpers';

describe('Paragraph component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Paragraph>{text}</Paragraph>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Paragraph>{text}</Paragraph>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Paragraph data-test="test">{text}</Paragraph>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('renders as specified element', () => {
    const text = 'Test';
    const type = 'span';
    const { container } = render(<Paragraph as={type}>{text}</Paragraph>);
    expect(container).toContainElement(container.querySelector(type));
  });
});
