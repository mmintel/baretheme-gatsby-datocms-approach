import React from 'react';
import { Link } from '@baretheme/ui';
import { render } from '../helpers';

describe('Link component', () => {
  it('renders without crashing', () => {
    const text = 'Test';
    const { container } = render(<Link to="foo">{text}</Link>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    const text = 'Test';
    const { getByText } = render(<Link to="foo">{text}</Link>);
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('passes props', () => {
    const text = 'Test';
    const { container } = render(<Link to="foo" data-test="test">{text}</Link>);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('renders the internal component', () => {
    const text = 'Test';
    const to = '#test';
    const internalTestID = 'internal';
    // eslint-disable-next-line react/prop-types
    const Internal = ({ children, to }) => <a data-testid={internalTestID} href={to}>{children}</a>;
    const { getByTestId } = render(<Link to={to} internal={Internal}>{text}</Link>);
    const node = getByTestId(internalTestID);
    expect(node).toHaveAttribute('href', to);
  });

  it('renders the external component', () => {
    const text = 'Test';
    const to = 'https://www.test.com';
    const externalTestID = 'external';
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    const External = (props) => <a data-testid={externalTestID} {...props} />;
    const { getByTestId } = render(<Link to={to} external={External}>{text}</Link>);
    const node = getByTestId(externalTestID);
    expect(node).toHaveAttribute('href', to);
  });
});
