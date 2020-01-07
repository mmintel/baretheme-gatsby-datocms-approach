import React from 'react';
import { act } from 'react-test-renderer';
import { Button, themes } from '@baretheme/ui';
import { renderWithTheme } from './helpers';

describe('Button component', () => {
  it('renders without crashing', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Button>Submit</Button>);
    });
    expect(component).toBeDefined();
  });

  it('renders children', () => {
    let component;
    const text = 'Submit';
    act(() => {
      component = renderWithTheme(<Button type="primary">{text}</Button>);
    });
    const element = component.root.children[0];
    expect(element.props.children).toEqual(text);
  });

  it('passes props', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Button data-test="test">Submit</Button>);
    });
    const element = component.root.children[0];
    expect(element.props['data-test']).toEqual('test');
  });

  it('adds correct styles with a size', () => {
    let component;
    const size = 2;
    act(() => {
      component = renderWithTheme(<Button size={size}>Submit</Button>);
    });
    expect(component.toJSON()).toHaveStyleRule('font-size', themes[0].fontSize(size));
  });

  it('adds correct styles with a type', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Button type="primary">Submit</Button>);
    });
    expect(component.toJSON()).toHaveStyleRule('background-color', themes[0].palettes.primary.background);
  });

  it('renders correctly with a nativeType', () => {
    let component;
    act(() => {
      component = renderWithTheme(<Button nativeType="input">Submit</Button>);
    });
    expect(component.toJSON().props.type).toEqual('input');
  });
});
