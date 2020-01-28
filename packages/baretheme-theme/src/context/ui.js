import React from 'react';
import PropTypes from 'prop-types';
import store from 'store';

import themes from '@baretheme/ui/themes';

const UIContext = React.createContext(null);

const useUI = function useUI() {
  const context = React.useContext(UIContext);
  return context;
};

const supportsDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches === true;

class UIProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTheme: this.props.config.defaultTheme,
      cookiesAccepted: true,
      navigation: {
        isOpen: false,
        sizes: null,
      },
      cookieConsent: {
        isOpen: false,
      },
      search: {
        isOpen: false,
        sizes: null,
      },
      languageSwitch: {
        isOpen: false,
      },
    };
  }

  componentDidMount() {
    this.getTheme();
    this.getCookies();
  }

  getCookies = () => {
    const lsCookies = store.get('cookies');

    if (lsCookies) {
      this.setState({
        cookiesAccepted: lsCookies,
      });
      this.closeCookieConsent();
    } else {
      this.openCookieConsent();
    }
  }

  getTheme = () => {
    if (!this.props.config.useThemeToggle) {
      return this.setState({ currentTheme: this.props.config.defaultTheme });
    }

    const lsTheme = store.get('theme');
    if (lsTheme) {
      this.setState({ currentTheme: lsTheme });
    } else if (supportsDarkMode()) {
      this.setState({ currentTheme: 'dark' });
    }
  };

  setTheme = (theme) => {
    store.set('theme', theme);
    this.setState({
      currentTheme: theme,
    });
  };

  toggleTheme = () => {
    if (this.state.currentTheme === 'dark') {
      this.setTheme('light');
    } else {
      this.setTheme('dark');
    }
  };

  toggleNavigation = () => {
    this.setState((prevState) => ({
      navigation: {
        ...prevState.navigation,
        isOpen: !prevState.navigation.isOpen,
      },
    }));
  };

  toggleSearch = () => {
    this.setState((prevState) => ({
      search: {
        ...prevState.search,
        isOpen: !prevState.search.isOpen,
      },
    }));
  };

  toggleLanguageSwitch = () => {
    this.setState((prevState) => ({
      languageSwitch: {
        ...prevState.languageSwitch,
        isOpen: !prevState.languageSwitch.isOpen,
      },
    }));
  };

  closeLanguageSwitch = () => {
    this.setState((prevState) => ({
      languageSwitch: {
        ...prevState.navigation,
        isOpen: false,
      },
    }));
  };

  closeNavigation = () => {
    this.setState((prevState) => ({
      navigation: {
        ...prevState.navigation,
        isOpen: false,
      },
    }));
  };

  closeCookieConsent = () => {
    this.setState({
      cookieConsent: {
        isOpen: false,
      },
    });
  };

  openCookieConsent = () => {
    this.setState({
      cookieConsent: {
        isOpen: true,
      },
    });
  };

  acceptCookies = () => {
    store.set('cookies', true);
    this.setState({
      cookiesAccepted: true,
    });
    this.closeCookieConsent();
  }

  declineCookies = () => {
    store.set('cookies', false);
    this.setState({
      cookiesAccepted: false,
    });
    this.closeCookieConsent();
  }

  closeSearch = () => {
    this.setState((prevState) => ({
      search: {
        ...prevState.search,
        isOpen: false,
      },
    }));
  };

  setNavigationSize = (sizes) => {
    this.setState((prevState) => ({
      navigation: {
        ...prevState.navigation,
        sizes,
      },
    }));
  };

  setSearchSize = (sizes) => {
    this.setState((prevState) => ({
      search: {
        ...prevState.search,
        sizes,
      },
    }));
  };

  closeAll = () => {
    this.closeSearch();
    this.closeNavigation();
    this.closeLanguageSwitch();
  };

  buildMediaQueries = (breakpoints) => {
    const getBreakpoint = (breakpoint) => {
      const index = breakpoints.findIndex((item) => item.key === breakpoint);
      const item = breakpoints[index];
      if (!breakpoint) {
        throw new Error(`Breakpoint "${breakpoint}" not found.`);
      }
      return {
        ...item,
        index,
      };
    };
    const ssrBreakpoint = getBreakpoint('medium');

    return {
      isLessThan(breakpoint) {
        const br = getBreakpoint(breakpoint);
        if (typeof window !== 'undefined') {
          return window.matchMedia(`(max-width: ${br.value}px)`).matches;
        }
        return br.index <= ssrBreakpoint.index;
      },
      isGreaterThan(breakpoint) {
        const br = getBreakpoint(breakpoint);
        if (typeof window !== 'undefined') {
          return window.matchMedia(`(min-width: ${br.value + 1}px)`).matches;
        }
        return br.index <= ssrBreakpoint.index;
      },
      isBetween(min, max) {
        const minBr = getBreakpoint(min);
        const maxBr = getBreakpoint(max);
        if (typeof window !== 'undefined') {
          return window.matchMedia(
            `(min-width: ${minBr.value + 1}px) and (max-width: ${maxBr.value}px)`,
          ).matches;
        }
        return (
          minBr.index <= ssrBreakpoint.index
          && maxBr.index <= ssrBreakpoint.index
        );
      },
    };
  };

  render() {
    const { config, children } = this.props;
    const theme = themes.find((theme) => theme.name === this.state.currentTheme);
    return (
      <UIContext.Provider
        value={{
          ...this.state,
          config,
          theme,
          closeCookieConsent: this.closeCookieConsent,
          acceptCookies: this.acceptCookies,
          declineCookies: this.declineCookies,
          closeNavigation: this.closeNavigation,
          closeSearch: this.closeSearch,
          closeLanguageSwitch: this.closeLanguageSwitch,
          closeAll: this.closeAll,
          setNavigationSize: this.setNavigationSize,
          setSearchSize: this.setSearchSize,
          toggleNavigation: this.toggleNavigation,
          toggleSearch: this.toggleSearch,
          toggleTheme: this.toggleTheme,
          toggleLanguageSwitch: this.toggleLanguageSwitch,
          media: this.buildMediaQueries(theme.breakpoints),
        }}
      >
        {children}
      </UIContext.Provider>
    );
  }
}

UIProvider.defaultProps = {
  config: {},
};

UIProvider.propTypes = {
  config: PropTypes.shape({
    defaultTheme: PropTypes.string,
    useThemeToggle: PropTypes.bool,
  }),
  children: PropTypes.element.isRequired,
};

export default UIContext;
export { UIProvider, useUI };
