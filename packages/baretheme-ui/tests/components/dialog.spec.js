import React from 'react';
import { Dialog } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Dialog component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Dialog>{text}</Dialog>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Dialog>{text}</Dialog>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Dialog data-test="test">{text}</Dialog>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('is invisble when closed', () => {
    const text = 'Test';
    const { container } = render(<Dialog>{text}</Dialog>);
    expect(container.firstChild).not.toBeVisible();
  });

  it('is visible when opened', () => {
    const text = 'Test';
    const { container } = render(<Dialog isOpen>{text}</Dialog>);
    expect(container.firstChild).toBeVisible();
  });

  it('calls onClose callback', () => {
    const text = 'Test';
    const handleClose = jest.fn();
    const { container } = render(<Dialog onClose={handleClose}>{text}</Dialog>);
    fireEvent.click(container.firstChild);
    expect(handleClose).toHaveBeenCalled();
  });
});
