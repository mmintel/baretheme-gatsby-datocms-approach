import React from 'react';
import * as ReactHookInview from 'react-hook-inview';
import { Reveal } from '@baretheme/ui';
import { render } from '../helpers';

jest.mock('react-hook-inview', () => ({
  useInView: jest.fn().mockImplementation(() => {
    const setRef = jest.fn();
    const observer = jest.fn();
    const intersecting = false;
    const entry = {
      boundingClientRect: {
        y: 0,
      },
    };
    return [setRef, intersecting, entry, observer];
  }),
}));

describe('Reveal component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Reveal>{text}</Reveal>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Reveal>{text}</Reveal>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Reveal data-test="test">{text}</Reveal>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('is invisible by default', () => {
    const text = 'Test';
    const { container } = render(<Reveal>{text}</Reveal>);
    expect(container.firstChild).not.toBeVisible();
  });

  it('is visible when in view', () => {
    // TODO refactor
    ReactHookInview.useInView.mockImplementation(() => {
      const setRef = jest.fn();
      const observer = jest.fn();
      const intersecting = true;
      const entry = {
        boundingClientRect: {
          y: 1,
        },
      };
      return [setRef, intersecting, entry, observer];
    });
    const text = 'Test';
    const { container } = render(<Reveal>{text}</Reveal>);
    expect(container.firstChild).toBeVisible();
  });
});
