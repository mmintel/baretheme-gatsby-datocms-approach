import React from 'react';
import { Dropdown as DropdownBase } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Dropdown component', () => {
  let instance = null;

  afterEach(() => {
    instance = null;
  });

  function Dropdown(props) {
    return <DropdownBase {...props} onCreate={(i) => { instance = i; }} />;
  }

  it('renders without crashing', () => {
    const text = 'Test';
    const { getByText } = render(
      <Dropdown>
        <div>{text}</div>
      </Dropdown>,
    );
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('does not render the content by default', () => {
    const text = 'Test';
    const dropdownText = 'Dropdown';
    const dropdownContent = <span>{dropdownText}</span>;
    render(
      <Dropdown content={dropdownContent}>
        <div>{text}</div>
      </Dropdown>,
    );
    expect(instance.popper.querySelector('strong')).toBeNull();
  });

  it('shows the dropdown on click', () => {
    const text = 'Test';
    const dropdownText = 'Dropdown';
    const dropdownContent = <strong>{dropdownText}</strong>;
    const { queryByText } = render(
      <Dropdown content={dropdownContent}>
        <div>{text}</div>
      </Dropdown>,
    );
    const node = queryByText(text);
    fireEvent.click(node);
    expect(instance.popper.querySelector('strong')).not.toBeNull();
  });
});
