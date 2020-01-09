import React from 'react';
import { Burger } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Burger component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Burger />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes props', () => {
    const { container } = render(<Burger data-test="test" />);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('fires the onToggle method on click', () => {
    const handleToggle = jest.fn();
    const { container } = render(<Burger onToggle={handleToggle} />);

    fireEvent.click(container.firstChild);
    expect(handleToggle).toHaveBeenCalled();
  });

  it('displays the right icon if open', () => {
    const { getByTestId } = render(<Burger />);
    const open = getByTestId('open');
    expect(open).toBeInTheDocument();
  });

  it('displays the right icon if closed', () => {
    const { getByTestId } = render(<Burger isOpen />);
    const close = getByTestId('close');
    expect(close).toBeInTheDocument();
  });
});
