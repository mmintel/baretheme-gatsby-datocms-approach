import React from 'react';
import { Bootstrap } from '@baretheme/ui';
import { render } from '../helpers';

describe('Bootstrap component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Bootstrap />);
    expect(container.firstChild).toBeDefined();
  });
});
