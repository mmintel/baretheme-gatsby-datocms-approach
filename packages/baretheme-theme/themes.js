import modularScale from 'modular-scale';
import { uniq, merge } from 'lodash';
import { darken, lighten } from 'polished';

const radii = ['0', '0.25rem', '0.5rem', '1rem'];

const radius = (n) => radii[n];

const breakpoints = [
  {
    key: 'huge',
    value: 1440,
  },
  {
    key: 'large',
    value: 1170,
  },
  {
    key: 'medium',
    value: 768,
  },
  {
    key: 'small',
    value: 450,
  },
];

const alpha = {
  0: 0,
  1: 0.125,
  2: 0.25,
  3: 0.5,
  4: 0.75,
  5: 0.8,
  6: 0.9,
  7: 0.95,
  8: 0.975,
  9: 0.99,
};

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
  shadow: '0, 0, 0',
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
      ratio: 'goldenSection',
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
  breakpoints,
  alpha,
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

const themes = {
  light: merge({}, shared, {
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
  dark: merge({}, shared, {
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
};

export const themeNames = Object.keys(themes);
export const colors = [
  ...Object.keys(themes.light.color),
  ...Object.keys(themes.dark.color),
];
export const palettes = uniq([...Object.keys(themes.light.palettes), ...Object.keys(themes.dark.palettes)]);
export default themes;
