import React from 'react';
import { Card } from '@baretheme/ui';
import { render, expectRenderError } from '../helpers';

describe('Card component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Card>{text}</Card>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Card>{text}</Card>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Card data-test="test">{text}</Card>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  describe('Card.Head compound component', () => {
    it('can not be used without Card', () => {
      const text = 'Test';
      expectRenderError(<Card.Head>{text}</Card.Head>, 'Card compound components cannot be rendered outside the Card component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Card>
          <Card.Head>
            {text}
          </Card.Head>
        </Card>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Card>
          <Card.Head data-test="test">
            {text}
          </Card.Head>
        </Card>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });
  });

  describe('Card.Body compound component', () => {
    it('can not be used without Card', () => {
      const text = 'Test';
      expectRenderError(<Card.Body>{text}</Card.Body>, 'Card compound components cannot be rendered outside the Card component');
    });

    it('renders children', () => {
      const text = 'Test';
      const { getByText } = render(
        <Card>
          <Card.Body>
            {text}
          </Card.Body>
        </Card>,
      );
      const node = getByText(text);
      expect(node).toBeInTheDocument();
    });

    it('passes props', () => {
      const text = 'Test';
      const { getByText } = render(
        <Card>
          <Card.Body data-test="test">
            {text}
          </Card.Body>
        </Card>,
      );
      const node = getByText(text);
      expect(node).toHaveAttribute('data-test', 'test');
    });

    it('adds correct styles with center', () => {
      const text = 'Test';
      const { getByText } = render(
        <Card>
          <Card.Body center>
            {text}
          </Card.Body>
        </Card>,
      );
      const node = getByText(text);
      expect(node).toHaveStyleRule('align-items', 'center');
      expect(node).toHaveStyleRule('justify-content', 'center');
    });
  });
});
