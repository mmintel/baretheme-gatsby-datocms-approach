import React from 'react';
import { Tooltip as TooltipBase } from '@baretheme/ui';
import { fireEvent } from '@testing-library/react';
import { render } from '../helpers';

describe('Tooltip component', () => {
  let instance = null;

  afterEach(() => {
    instance = null;
  });

  function Tooltip(props) {
    return <TooltipBase {...props} onCreate={(i) => { instance = i; }} />;
  }

  it('renders without crashing', () => {
    const text = 'Test';
    const { getByText } = render(
      <Tooltip>
        <div>{text}</div>
      </Tooltip>,
    );
    const node = getByText(text);
    expect(node).toBeInTheDocument();
  });

  it('does not render the content by default', () => {
    const text = 'Test';
    const tooltipText = 'Tooltip';
    const tooltipContent = <span>{tooltipText}</span>;
    render(
      <Tooltip content={tooltipContent}>
        <div>{text}</div>
      </Tooltip>,
    );
    expect(instance.popper.querySelector('strong')).toBeNull();
  });

  it('shows the tooltip on mouseOver', () => {
    const text = 'Test';
    const tooltipText = 'Tooltip';
    const tooltipContent = <strong>{tooltipText}</strong>;
    const { queryByText } = render(
      <Tooltip content={tooltipContent}>
        <div>{text}</div>
      </Tooltip>,
    );
    const node = queryByText(text);
    fireEvent.mouseOver(node);
    expect(instance.popper.querySelector('strong')).not.toBeNull();
  });
});
