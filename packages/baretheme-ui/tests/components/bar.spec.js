import React from 'react';
import { Bar, themes } from '@baretheme/ui';
import { render, expectRenderError } from '../helpers';

describe('Bar component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Bar>{text}</Bar>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Bar>{text}</Bar>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Bar data-test="test">{text}</Bar>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('adds correct styles with align', () => {
    const text = 'Test';
    const { container, rerender } = render(<Bar align="left">{text}</Bar>);
    expect(container.firstChild).toHaveStyleRule('justify-content', 'flex-start');

    rerender(<Bar align="center">{text}</Bar>);
    expect(container.firstChild).toHaveStyleRule('justify-content', 'center');

    rerender(<Bar align="right">{text}</Bar>);
    expect(container.firstChild).toHaveStyleRule('justify-content', 'flex-end');
  });

  it('adds correct styles without align', () => {
    const text = 'Test';
    const { container } = render(<Bar>{text}</Bar>);
    expect(container.firstChild).toHaveStyleRule('justify-content', 'flex-start');
  });

  it('adds correct styles with flush', () => {
    const text = 'Test';
    const { container } = render(<Bar flush>{text}</Bar>);
    expect(container.firstChild).toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(container.firstChild).toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  it('adds correct styles without flush', () => {
    const text = 'Test';
    const { container } = render(<Bar>{text}</Bar>);
    expect(container.firstChild).not.toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(container.firstChild).not.toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  describe('Bar.Item compound component', () => {
    it('can not be used without Bar', () => {
      const text = 'Test';
      expectRenderError(<Bar.Item>{text}</Bar.Item>, 'Bar compound components cannot be rendered outside the Bar component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Bar>
          <Bar.Item>{text}</Bar.Item>
        </Bar>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Bar>
          <Bar.Item data-test="test">{text}</Bar.Item>
        </Bar>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });
  });

  describe('Bar.ItemText compound component', () => {
    it('can not be used without Bar', () => {
      const text = 'Test';
      expectRenderError(<Bar.ItemText>{text}</Bar.ItemText>, 'Bar compound components cannot be rendered outside the Bar component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Bar>
          <Bar.Item>
            <Bar.ItemText>
              {text}
            </Bar.ItemText>
          </Bar.Item>
        </Bar>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Bar>
          <Bar.Item>
            <Bar.ItemText data-test="test">
              {text}
            </Bar.ItemText>
          </Bar.Item>
        </Bar>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });

    it('sets active styles', () => {
      const text = 'Test';
      const { getByText } = render(
        <Bar>
          <Bar.Item>
            <Bar.ItemText active>
              {text}
            </Bar.ItemText>
          </Bar.Item>
        </Bar>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('font-weight', 'bold');
    });
  });
});
