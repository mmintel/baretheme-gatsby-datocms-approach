import modularScale from 'modular-scale';
import { uniq, merge } from 'lodash';
import { darken, lighten } from 'polished';
import alpha from './theme/alpha';
import radius from './theme/radius';
import { breakpoint, breakpoints } from './theme/breakpoints';

const lightColors = {
  error: '#eb4034',
  success: '#2fde3d',
  accent: '#2b4bf7',
  foreground: '#444',
  background: '#fafafa',
  dimmed: '#999',
  faded: '#eee',
  highlight: '#333',
  raised: '#fff',
  lowered: '#efefef',
  shadow: '170, 170, 170',
  overlay: `rgba(255,255,255,${alpha[5]})`,
};

const darkColors = {
  error: '#eb4034',
  success: '#2fde3d',
  accent: '#0885ff',
  foreground: '#bbb',
  background: '#1c1b1b',
  dimmed: '#666',
  faded: '#222',
  highlight: '#fff',
  raised: '#252525',
  lowered: '#161617',
  shadow: '10, 10, 10',
  overlay: `rgba(0,0,0,${alpha[5]})`,
};

const shared = {
  fontSize: (n) => {
    const fs = modularScale({
      base: 1,
      ratio: 'majorThird',
    });
    return `${fs(n)}rem`;
  },
  lineHeight: (n) => {
    const lh = modularScale({
      base: 1.65,
      ratio: 'majorThird',
    });
    return lh(n);
  },
  spacing: (n) => {
    const ms = modularScale({
      base: 1,
      ratio: 'goldenSection',
    });
    return `${ms(n)}rem`;
  },
  radius,
  alpha,
  breakpoint,
};

function generateShadows(color) {
  const shadows = [
    `0 1px 3px rgba(${color},0.12), 0 1px 2px rgba(${color},0.24)`,
    `0 3px 6px rgba(${color},0.16), 0 3px 6px rgba(${color},0.23)`,
    `0 10px 20px rgba(${color},0.19), 0 6px 6px rgba(${color},0.23)`,
    `0 14px 28px rgba(${color},0.25), 0 10px 10px rgba(${color},0.22)`,
    `0 19px 38px rgba(${color},0.30), 0 15px 12px rgba(${color},0.22)`,
  ];
  return shadows;
}

const themes = [
  merge({}, shared, {
    name: 'light',
    shadow: (n) => {
      const shadows = generateShadows(lightColors.shadow);
      return shadows[n];
    },
    emphasize: (color) => darken(0.2, color),
    color: lightColors,
    palettes: {
      primary: {
        background: lightColors.accent,
        foreground: '#fff',
      },
      error: {
        background: lightColors.error,
        foreground: '#fff',
      },
    },
  }),
  merge({}, shared, {
    name: 'dark',
    shadow: (n) => {
      const shadows = generateShadows(darkColors.shadow);
      return shadows[n];
    },
    emphasize: (color) => lighten(0.1, color),
    color: darkColors,
    palettes: {
      primary: {
        background: darkColors.accent,
        foreground: '#fff',
      },
      error: {
        background: darkColors.error,
        foreground: '#fff',
      },
    },
  }),
];

const themeNames = themes.map((t) => t.name);
const colors = uniq([
  ...Object.keys(themes[0].color),
  ...Object.keys(themes[1].color),
]);
const palettes = uniq([...Object.keys(themes[0].palettes), ...Object.keys(themes[0].palettes)]);

export {
  themes, themeNames, colors, palettes, breakpoints,
};
export default themes;
