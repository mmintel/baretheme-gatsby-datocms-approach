import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { useSpring, animated, interpolate } from 'react-spring';

// import { SlideIn } from "./transition"
import { Dialog, Offscreen, Sheet } from '@baretheme/ui';
import UIContext from '../context/ui';
import Search from './search';
import CookieConsent from './cookie-consent';
import Header from './header';
import Footer from './footer';
import MainNavigation from './main-navigation';
import LanguageSwitch from './language-switch';
import Content from './content';
import filterNavItems from '../util/filter-nav-items';
import Indicators from './indicators';

const LayoutBody = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.background};

  ${(props) => props.locked && css`
    overflow: hidden;
    max-height: 100vh;
  `}
`;

const Main = styled.main``;

const StyledIndicators = styled(Indicators)`
  margin: 2rem ${(props) => props.theme.spacing(1)} 1rem;
`;

const LayoutOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  transition: background-color 0.5s ease-in-out;
  pointer-events: none;

  ${(props) => props.open && css`
    pointer-events: auto;
    background-color: ${props.theme.color.overlay};
  `}
`;

const AnimatedOffscreenNavigation = ({ children }) => {
  const ui = React.useContext(UIContext);
  const { y } = useSpring({
    y: ui.search.isOpen ? ui.search.sizes.height * 1 : 0,
  });
  return (
    <Offscreen
      position="right"
      isOpen={ui.navigation.isOpen}
      onResize={ui.setNavigationSize}
      onClose={ui.closeNavigation}
      onRest={ui.onLayoutAnimationRest}
    >
      <animated.div
        onClick={ui.closeSearch}
        style={{
          willChange: 'transform',
          transform: y.interpolate((y) => `translateY(${y}px)`),
        }}
      >
        <div onClick={(e) => e.stopPropagation()} role="presentation">
          {children}
        </div>
      </animated.div>
    </Offscreen>
  );
};

AnimatedOffscreenNavigation.propTypes = {
  children: PropTypes.node.isRequired,
};

const AnimatedLayoutBody = animated(LayoutBody);

const AnimatedLayout = ({ locked, children }) => {
  const ui = React.useContext(UIContext);
  const { x, y } = useSpring({
    x: ui.navigation.isOpen ? ui.navigation.sizes.width * -1 : 0,
    y: ui.search.isOpen ? ui.search.sizes.height * 1 : 0,
  });
  return (
    <AnimatedLayoutBody
      locked={locked}
      style={{
        willChange: 'transform',
        transform: interpolate(
          [x, y],
          (x, y) => `translateX(${x}px) translateY(${y}px)`,
        ),
      }}
    >
      {children}
    </AnimatedLayoutBody>
  );
};

AnimatedLayout.defaultProps = {
  locked: false,
};

AnimatedLayout.propTypes = {
  locked: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const LayoutWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const Layout = ({ children, pageContext, data }) => {
  const ui = React.useContext(UIContext);
  const offscreenOpen = ui.navigation.isOpen || ui.search.isOpen;
  const mainNavigation = filterNavItems(pageContext.layout.mainNavigation);
  const footerNavigation = filterNavItems(pageContext.layout.secondaryNavigation);

  const handleOverlayClick = () => {
    if (ui.navigation.isOpen) {
      ui.closeNavigation();
    }
    if (ui.search.isOpen) {
      ui.closeSearch();
    }
  };

  const handleAcceptCookies = () => {
    ui.acceptCookies();
  };

  return (
    <LayoutWrapper>
      <AnimatedLayout ctx={ui} locked={offscreenOpen}>
        <LayoutOverlay onClick={handleOverlayClick} open={offscreenOpen} />
        <Header navigation={mainNavigation} socialAccounts={pageContext.layout.socialAccounts} />
        <Main>
          { pageContext.layout.before && (
            <Content items={pageContext.layout.before} />
          )}
          {children}
          { pageContext.layout.after && (
            <Content items={pageContext.layout.after} />
          )}
        </Main>
        <Footer navigation={footerNavigation} />
      </AnimatedLayout>

      { data.site.siteMetadata.useCookies && pageContext.layout.disclaimerDocument && (
        <Sheet
          position="bottom"
          isOpen={ui.cookieConsent.isOpen}
        >
          <CookieConsent readmoreUrl={`/${pageContext.layout.disclaimerDocument.slug}`} onAccept={handleAcceptCookies} />
        </Sheet>
      )}

      <AnimatedOffscreenNavigation ctx={ui}>
        <MainNavigation
          header={(
            <StyledIndicators
              useSearch={data.site.siteMetadata.useSearch}
              useTranslations={data.site.siteMetadata.useTranslations}
              useThemeToggle={data.site.siteMetadata.useThemeToggle}
            />
          )}
          onClose={ui.closeNavigation}
          navigation={mainNavigation}
        />
      </AnimatedOffscreenNavigation>

      {ui.config.useTranslations && (
        <Dialog
          isOpen={ui.languageSwitch.isOpen}
          onClose={ui.toggleLanguageSwitch}
        >
          <LanguageSwitch
            parent={pageContext.node.treeParent}
            locales={pageContext.site.locales}
            allSlugLocales={pageContext.node.allSlugLocales}
          />
        </Dialog>
      )}

      {ui.config.useSearch && (
        <Offscreen
          position="top"
          isOpen={ui.search.isOpen}
          onResize={ui.setSearchSize}
          onClose={ui.closeSearch}
          onRest={ui.onLayoutAnimationRest}
        >
          <Search isOpen={ui.search.isOpen} />
        </Offscreen>
      )}
    </LayoutWrapper>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    site: PropTypes.shape({
      siteMetadata: PropTypes.shape({
        useThemeToggle: PropTypes.bool,
        useSearch: PropTypes.bool,
        useCookies: PropTypes.bool,
        useTranslations: PropTypes.bool,
      }),
    }),
  }).isRequired,
  pageContext: PropTypes.shape({
    layout: PropTypes.shape({
      mainNavigation: PropTypes.array,
      secondaryNavigation: PropTypes.array,
      socialAccounts: PropTypes.array,
      before: PropTypes.array,
      after: PropTypes.array,
      disclaimerDocument: PropTypes.shape({
        slug: PropTypes.string,
      }),
    }),
    node: PropTypes.shape({
      treeParent: PropTypes.object,
      allSlugLocales: PropTypes.array,
    }),
    site: PropTypes.shape({
      locales: PropTypes.array,
    }),
  }).isRequired,
};

export default (props) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          useCookies
          useTranslations
          useSearch
          useThemeToggle
        }
      }
    }
  `);
  return <Layout data={data} {...props} />;
};
