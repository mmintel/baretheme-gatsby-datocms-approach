import React from 'react';
import { TextLink } from '@baretheme/ui';
import { render } from '../helpers';

describe('TextLink component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<TextLink>{text}</TextLink>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<TextLink>{text}</TextLink>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<TextLink data-test="test">{text}</TextLink>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });
});
