import React from 'react';
import { IconBar } from '@baretheme/ui';
import { render, expectRenderError } from '../helpers';

describe('IconBar component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<IconBar>{text}</IconBar>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<IconBar>{text}</IconBar>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<IconBar data-test="test">{text}</IconBar>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  describe('IconBar.Item compound component', () => {
    it('can not be used without IconBar', () => {
      const text = 'Test';
      expectRenderError(<IconBar.Item>{text}</IconBar.Item>, 'IconBar compound components cannot be rendered outside the IconBar component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <IconBar>
          <IconBar.Item>
            {text}
          </IconBar.Item>
        </IconBar>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <IconBar>
          <IconBar.Item data-test="test">
            {text}
          </IconBar.Item>
        </IconBar>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });
  });
});
