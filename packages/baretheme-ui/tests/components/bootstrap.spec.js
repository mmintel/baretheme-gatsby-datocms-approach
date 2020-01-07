import React from 'react';
import { act } from 'react-test-renderer';
import { Bootstrap } from '@baretheme/ui';
import { renderWithTheme } from '../helpers';

describe('Bootstrap component', () => {
  it('renders without crashing', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Bootstrap />);
    });
    expect(component).toBeDefined();
  });
});
