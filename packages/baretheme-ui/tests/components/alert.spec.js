import React from 'react';
import { act } from 'react-test-renderer';
import { Alert } from '@baretheme/ui';
import { renderWithTheme } from '../helpers';

describe('Alert component', () => {
  it('renders without crashing', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Alert>{text}</Alert>);
    });
    expect(component).toBeDefined();
  });

  it('renders children', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Alert>{text}</Alert>);
    });
    const element = component.root.children[0];
    expect(element.props.children).toEqual(text);
  });

  it('passes props', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Alert data-test="test">{text}</Alert>);
    });
    expect(component.toJSON().props['data-test']).toEqual('test');
  });
});
