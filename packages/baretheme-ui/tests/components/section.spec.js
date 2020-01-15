import React from 'react';
import { Section } from '@baretheme/ui';
import { render } from '../helpers';

describe('Section component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Section>{text}</Section>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Section>{text}</Section>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Section data-test="test">{text}</Section>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it.skip('TODO: sets correct spacings', () => {
    // TODO: test withSpacing HOC first
    // const spacing = 2;
    // const text = 'Test';
    // const { container, debug, getByText } = render(<Section mt={spacing} mb={spacing}>{text}</Section>);
    // const node = getByText(text);
    // expect(container.firstChild).toHaveStyleRule('margin-bottom', themes[0].spacing(spacing));
  });
});
