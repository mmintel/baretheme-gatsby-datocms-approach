import React from 'react';
import { List } from '@baretheme/ui';
import { render, expectRenderError } from '../helpers';

describe('List component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<List>{text}</List>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<List>{text}</List>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<List data-test="test">{text}</List>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  describe('List.Item compound component', () => {
    it('can not be used without List', () => {
      const text = 'Test';
      expectRenderError(<List.Item>{text}</List.Item>, 'List compound components cannot be rendered outside the List component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item>{text}</List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item data-test="test">{text}</List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });
  });

  describe('List.ItemText compound component', () => {
    it('can not be used without List', () => {
      const text = 'Test';
      expectRenderError(<List.ItemText>{text}</List.ItemText>, 'List compound components cannot be rendered outside the List component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item>
            <List.ItemText>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item>
            <List.ItemText data-test="test">
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });

    it('sets active styles', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item>
            <List.ItemText active>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('font-weight', 'bold');
    });

    it('adds correct styles with align', () => {
      const text = 'Test';
      const { getByText, rerender } = render(
        <List align="left">
          <List.Item>
            <List.ItemText>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('text-align', 'left');

      rerender(
        <List align="center">
          <List.Item>
            <List.ItemText>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      expect(node).toHaveStyleRule('text-align', 'center');

      rerender(
        <List align="right">
          <List.Item>
            <List.ItemText>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      expect(node).toHaveStyleRule('text-align', 'right');
    });

    it('adds correct styles without align', () => {
      const text = 'Test';
      const { getByText } = render(
        <List>
          <List.Item>
            <List.ItemText>
              {text}
            </List.ItemText>
          </List.Item>
        </List>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('text-align', 'left');
    });
  });
});
