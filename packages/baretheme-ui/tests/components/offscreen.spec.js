import React from 'react';
import { Offscreen } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Offscreen component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Offscreen>{text}</Offscreen>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Offscreen>{text}</Offscreen>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Offscreen data-test="test">{text}</Offscreen>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('calls onClose callback on ESC press', () => {
    const text = 'Test';
    const handleClose = jest.fn();
    const { container } = render(<Offscreen onClose={handleClose}>{text}</Offscreen>);
    fireEvent.keyUp(container.firstChild, { key: 'Escape', code: 27 });
    expect(handleClose).toHaveBeenCalled();
  });

  it.skip('TODO: calls onResize callback on resizing', () => {
  });

  it.skip('TODO: calls onRest callback on after state change', () => {
  });

  it.skip('TODO: adds the correct styles when open', () => {
  });
});
