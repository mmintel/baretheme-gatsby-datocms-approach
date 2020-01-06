import React from 'react';
import { act } from 'react-test-renderer';
import { Button } from '@baretheme/ui';
import { renderWithTheme } from './helpers';

describe('Button component', () => {
  it('matches the snapshot', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Button>Submit</Button>);
    });
    expect(component.toJSON()).toMatchSnapshot();
  });
});
