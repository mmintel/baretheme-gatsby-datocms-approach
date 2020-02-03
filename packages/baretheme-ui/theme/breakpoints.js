const breakpoints = {
  onlyMini: '(max-width: 479px)',
  small: '(min-width: 480px)',
  onlySmall: '(min-width: 480px) and (max-width: 767px)',
  medium: '(min-width: 768px)',
  onlyMedium: '(min-width: 768px) and (max-width: 1169px)',
  large: '(min-width: 1170px)',
  onlyLarge: '(min-width: 1170px) and (max-width: 1439px)',
  huge: '(min-width: 1440px)',
  onlyHuge: '(min-width: 1440px) and (max-width: 1999px)',
  gigantic: '(min-width: 2000px)',
  portrait: '(orientation: portrait)',
  retina: '(min-resolution: 2dppx)',
};

const breakpoint = function breakpoint(name) {
  return `@media ${breakpoints[name]}`;
};

export default breakpoint;

export { breakpoint, breakpoints };
