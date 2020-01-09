import React from 'react';
import { Banner } from '@baretheme/ui';
import { render } from '../helpers';

describe('Banner component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Banner>{text}</Banner>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Banner>{text}</Banner>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Banner data-test="test">{text}</Banner>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  describe('actions', () => {
    const text = 'Test';
    const actionsText = 'Actions-Test';
    const Actions = () => <span>{actionsText}</span>;

    it('renders when passed', () => {
      const { getByText } = render(<Banner actions={<Actions />}>{text}</Banner>);
      const node = getByText(actionsText);
      expect(node).toBeInTheDocument();
    });

    it('does not render when not passed', () => {
      const { queryByText } = render(<Banner>{text}</Banner>);
      const node = queryByText(actionsText);
      expect(node).toBeNull();
    });
  });
});
