import React from 'react';
import { Field } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Field component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Field />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes props', () => {
    const { getByTestId } = render(<Field data-test="test" />);
    const node = getByTestId('field');
    expect(node).toHaveAttribute('data-test', 'test');
  });

  it('renders the prepend', () => {
    const prependText = 'Prepend';
    const prepend = <div>{prependText}</div>;
    const { getByText } = render(
      <Field prepend={prepend} />,
    );
    const node = getByText(prependText);
    expect(node).toBeInTheDocument();
  });

  it('renders the append', () => {
    const appendText = 'Prepend';
    const append = <div>{appendText}</div>;
    const { getByText } = render(
      <Field append={append} />,
    );
    const node = getByText(appendText);
    expect(node).toBeInTheDocument();
  });

  it('focuses the input on click', () => {
    const { container, getByTestId } = render(
      <Field />,
    );
    const node = getByTestId('input');
    fireEvent.click(container.firstChild);
    expect(node).toHaveFocus();
  });

  it('hides the placeholder with a value', () => {
    const placeholderText = 'Placeholder-Text';
    const { getByTestId, getByText } = render(
      <Field placeholder={placeholderText} />,
    );
    const node = getByTestId('input');
    fireEvent.change(node, {
      target: {
        value: 'Test',
      },
    });
    const placeholder = getByText(placeholderText);
    expect(placeholder).not.toBeVisible();
  });

  it('shows a label when there is no error', () => {
    const labelText = 'E-Mail';
    const { getByText } = render(
      <Field label={labelText} />,
    );
    const label = getByText(labelText);
    expect(label).toBeVisible();
  });

  it('shows no label when there is an error and a value', () => {
    const labelText = 'E-Mail';
    const { queryByText } = render(
      <Field label={labelText} error="Whoops." value="test" />,
    );
    const label = queryByText(labelText);
    expect(label).toBeNull();
  });

  it('shows no error message without a value', () => {
    const errorMessage = 'Whoops';
    const { queryByText } = render(
      <Field error={errorMessage} />,
    );
    const error = queryByText(errorMessage);
    expect(error).toBeNull();
  });

  it('shows the error message when it has a value', () => {
    const errorMessage = 'Whoops';
    const { getByText } = render(
      <Field value="test" error={errorMessage} />,
    );
    const error = getByText(errorMessage);
    expect(error).toBeVisible();
  });
});
