import React from 'react';
import { Icon, themes } from '@baretheme/ui';
import { mdiMenu } from '@mdi/js';
import { render } from '../helpers';

describe('Icon component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Icon path={mdiMenu} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('passes props', () => {
    const { container } = render(<Icon data-test="test" path={mdiMenu} />);
    expect(container.firstChild).toHaveAttribute('data-test', 'test');
  });

  it('adds the correct styles with color', () => {
    const color = 'accent';
    const { container } = render(<Icon color={color} path={mdiMenu} />);
    expect(container.firstChild).toHaveStyleRule('fill', themes[0].color[color]);
  });
});
