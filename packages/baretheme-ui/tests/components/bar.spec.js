import React from 'react';
import { act } from 'react-test-renderer';
import { Bar, themes } from '@baretheme/ui';
import { renderWithTheme, expectRenderError } from '../helpers';

describe('Bar component', () => {
  it('renders without crashing', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar>{text}</Bar>);
    });
    expect(component).toBeDefined();
  });

  it('renders children', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar>{text}</Bar>);
    });
    const element = component.root.children[0];
    expect(element.props.children).toEqual(text);
  });

  it('passes props', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar data-test="test">{text}</Bar>);
    });
    expect(component.toJSON().props['data-test']).toEqual('test');
  });

  it('adds correct styles with align', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar align="left">{text}</Bar>);
    });
    expect(component.toJSON()).toHaveStyleRule('justify-content', 'flex-start');

    act(() => {
      component = renderWithTheme(<Bar align="center">{text}</Bar>);
    });
    expect(component.toJSON()).toHaveStyleRule('justify-content', 'center');

    act(() => {
      component = renderWithTheme(<Bar align="right">{text}</Bar>);
    });
    expect(component.toJSON()).toHaveStyleRule('justify-content', 'flex-end');
  });

  it('adds correct styles without align', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar>{text}</Bar>);
    });
    expect(component.toJSON()).toHaveStyleRule('justify-content', 'flex-start');
  });

  it('adds correct styles with flush', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar flush>{text}</Bar>);
    });
    expect(component.toJSON()).toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(component.toJSON()).toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  it('adds correct styles without flush', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Bar>{text}</Bar>);
    });
    expect(component.toJSON()).not.toHaveStyleRule('margin-left', `-${themes[0].spacing(1)}`);
    expect(component.toJSON()).not.toHaveStyleRule('margin-right', `-${themes[0].spacing(1)}`);
  });

  describe('Bar.Item compound component', () => {
    it('can not be used without Bar', () => {
      const text = 'Test';
      expectRenderError(<Bar.Item>{text}</Bar.Item>, 'Bar compound components cannot be rendered outside the Bar component');
    });

    it('renders children', () => {
      let component;
      const text = 'Test';
      act(() => {
        component = renderWithTheme(
          <Bar>
            <Bar.Item>{text}</Bar.Item>
          </Bar>,
        );
      });
      const element = component.root.findByType(Bar.Item);
      expect(element.props.children).toEqual(text);
    });

    it('passes props', () => {
      let component;
      const text = 'Test';
      act(() => {
        component = renderWithTheme(
          <Bar>
            <Bar.Item data-test="test">{text}</Bar.Item>
          </Bar>,
        );
      });
      const element = component.root.findByType(Bar.Item);
      expect(element.props['data-test']).toEqual('test');
    });
  });

  describe('Bar.ItemText compound component', () => {
    it('can not be used without Bar', () => {
      const text = 'Test';
      expectRenderError(<Bar.ItemText>{text}</Bar.ItemText>, 'Bar compound components cannot be rendered outside the Bar component');
    });

    it('renders children', () => {
      let component;
      const text = 'Test';
      act(() => {
        component = renderWithTheme(
          <Bar>
            <Bar.Item>
              <Bar.ItemText>{text}</Bar.ItemText>
            </Bar.Item>
          </Bar>,
        );
      });
      const element = component.root.findByType(Bar.ItemText);
      expect(element.props.children).toEqual(text);
    });

    it('passes props', () => {
      let component;
      const text = 'Test';
      act(() => {
        component = renderWithTheme(
          <Bar>
            <Bar.Item>
              <Bar.ItemText data-test="test">{text}</Bar.ItemText>
            </Bar.Item>
          </Bar>,
        );
      });
      const element = component.root.findByType(Bar.ItemText);
      expect(element.props['data-test']).toEqual('test');
    });

    it('sets active styles', () => {
      let component;
      const text = 'Test';
      act(() => {
        component = renderWithTheme(
          <Bar>
            <Bar.Item>
              <Bar.ItemText data-test="test" active>{text}</Bar.ItemText>
            </Bar.Item>
          </Bar>,
        );
      });
      expect(component.toJSON().children[0].children[0]).toHaveStyleRule('font-weight', 'bold');
    });
  });
});
