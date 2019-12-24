import { addParameters, addDecorator, configure } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';

import Baretheme from './baretheme';
import ThemeDecorator from './theme-decorator';

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = ""
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}

// automatically import all files ending in *.stories.js
configure(require.context('../packages', true, /\.stories\.js$/), module);

addDecorator(jsxDecorator)
addDecorator(withKnobs)
addDecorator(ThemeDecorator)

addParameters({
  options: {
    theme: Baretheme,
  },
});