import React from 'react';
import { Stack, themes } from '@baretheme/ui';
import { render, expectRenderError } from '../helpers';

describe('Stack component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Stack>{text}</Stack>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Stack>{text}</Stack>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Stack data-test="test">{text}</Stack>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('adds correct styles with flush', () => {
    const text = 'Test';
    const { container } = render(<Stack flush>{text}</Stack>);
    expect(container.firstChild).toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(container.firstChild).toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  it('adds correct styles without flush', () => {
    const text = 'Test';
    const { container } = render(<Stack>{text}</Stack>);
    expect(container.firstChild).not.toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(container.firstChild).not.toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  describe('Stack.Item compound component', () => {
    it('can not be used without Stack', () => {
      const text = 'Test';
      expectRenderError(<Stack.Item>{text}</Stack.Item>, 'Stack compound components cannot be rendered outside the Stack component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item>{text}</Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item data-test="test">{text}</Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });
  });

  describe('Stack.ItemText compound component', () => {
    it('can not be used without Stack', () => {
      const text = 'Test';
      expectRenderError(<Stack.ItemText>{text}</Stack.ItemText>, 'Stack compound components cannot be rendered outside the Stack component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item>
            <Stack.ItemText>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item>
            <Stack.ItemText data-test="test">
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });

    it('sets active styles', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item>
            <Stack.ItemText active>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('font-weight', 'bold');
    });

    it('adds correct styles with align', () => {
      const text = 'Test';
      const { getByText, rerender } = render(
        <Stack align="left">
          <Stack.Item>
            <Stack.ItemText>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('text-align', 'left');

      rerender(
        <Stack align="center">
          <Stack.Item>
            <Stack.ItemText>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      expect(node).toHaveStyleRule('text-align', 'center');

      rerender(
        <Stack align="right">
          <Stack.Item>
            <Stack.ItemText>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      expect(node).toHaveStyleRule('text-align', 'right');
    });

    it('adds correct styles without align', () => {
      const text = 'Test';
      const { getByText } = render(
        <Stack>
          <Stack.Item>
            <Stack.ItemText>
              {text}
            </Stack.ItemText>
          </Stack.Item>
        </Stack>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('text-align', 'left');
    });
  });
});
