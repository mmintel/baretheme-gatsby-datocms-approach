import React from 'react';
import { Flip } from '@baretheme/ui';
import { render } from '../helpers';

describe('Flip component', () => {
  it('passes props', () => {
    const { container } = render(<Flip data-test="test" front="test" back="test" />);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('renders front and back', () => {
    const frontText = 'Front-Text';
    const backText = 'Back-Text';
    const { getByText } = render(
      <Flip front={frontText} back={backText} />,
    );
    const front = getByText(frontText);
    const back = getByText(backText);
    expect(front).toBeVisible();
    expect(back).toBeVisible();
  });

  it('flips', () => {
    const { getByTestId } = render(<Flip front="test" back="test" flipped />);
    const flipper = getByTestId('flipper');
    expect(flipper).toHaveStyle(`
      transform: rotateY(180deg)
    `);
  });
});
