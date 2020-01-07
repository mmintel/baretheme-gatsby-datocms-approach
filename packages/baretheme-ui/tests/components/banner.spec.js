import React from 'react';
import { act } from 'react-test-renderer';
import { Banner } from '@baretheme/ui';
import { renderWithTheme } from '../helpers';

describe('Banner component', () => {
  it('renders without crashing', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Banner>{text}</Banner>);
    });
    expect(component).toBeDefined();
  });

  it('renders children', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Banner>{text}</Banner>);
    });
    const element = component.root.children[0];
    expect(element.props.children).toEqual(text);
  });

  it('passes props', () => {
    let component;
    const text = 'Test';
    act(() => {
      component = renderWithTheme(<Banner data-test="test">{text}</Banner>);
    });
    expect(component.toJSON().props['data-test']).toEqual('test');
  });

  describe('actions', () => {
    const text = 'Test';
    const actionsText = 'Actions-Test';
    const Actions = () => <span>{actionsText}</span>;

    it('renders when passed', () => {
      let component;
      act(() => {
        component = renderWithTheme(<Banner actions={<Actions />}>{text}</Banner>);
      });
      const elements = component.root.findAllByProps({ children: actionsText });
      expect(elements.length).toEqual(1);
    });

    it('does not render when not passed', () => {
      let component;
      act(() => {
        component = renderWithTheme(<Banner>{text}</Banner>);
      });
      const elements = component.root.findAllByProps({ children: actionsText });
      expect(elements.length).toEqual(0);
    });
  });
});
