import React from 'react';
import { Tippy } from '@baretheme/ui';
import { render } from '../helpers';

describe('Tippy component', () => {
  it('renders with content', () => {
    const text = 'Test';
    const { container } = render(<Tippy content="test"><span>{text}</span></Tippy>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Tippy><span>{text}</span></Tippy>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });
});
