import React from 'react';
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
import Blocks from './blocks';
import filterNavItems from '../util/filter-nav-items';

const LayoutWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  ${(props) => css`
    background-color: ${props.theme.color.background};
  `}
`;

const Main = styled.main``;

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

const AnimatedOffscreenNavigation = ({ ctx, children }) => {
  const { y } = useSpring({
    y: ctx.search.isOpen ? ctx.search.sizes.height * 1 : 0,
  });
  return (
    <Offscreen
      position="right"
      isOpen={ctx.navigation.isOpen}
      onResize={ctx.setNavigationSize}
      onClose={ctx.closeNavigation}
      onRest={ctx.onLayoutAnimationRest}
    >
      <animated.div
        onClick={ctx.closeSearch}
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

const AnimatedLayoutWrapper = animated(LayoutWrapper);

const AnimatedLayout = ({ ctx, children, onClick }) => {
  const { x, y } = useSpring({
    x: ctx.navigation.isOpen ? ctx.navigation.sizes.width * -1 : 0,
    y: ctx.search.isOpen ? ctx.search.sizes.height * 1 : 0,
  });
  return (
    <AnimatedLayoutWrapper
      onClick={onClick}
      style={{
        willChange: 'transform',
        transform: interpolate(
          [x, y],
          (x, y) => `translateX(${x}px) translateY(${y}px)`,
        ),
      }}
    >
      {children}
    </AnimatedLayoutWrapper>
  );
};

class Layout extends React.Component {
  handleOverlayClick = () => {
    if (this.context.navigation.isOpen) {
      this.context.closeNavigation();
    }
    if (this.context.search.isOpen) {
      this.context.closeSearch();
    }
  };

  handleAcceptCookies = () => {
    this.context.acceptCookies();
  }

  render() {
    const { children, pageContext, data } = this.props;
    const offscreenOpen = this.context.navigation.isOpen || this.context.search.isOpen;
    const mainNavigation = filterNavItems(pageContext.layout.mainNavigation);
    const footerNavigation = filterNavItems(pageContext.layout.secondaryNavigation);

    return (
      <div style={{ width: '100vw', overflow: 'hidden', position: 'relative' }}>
        <AnimatedLayout ctx={this.context}>
          <LayoutOverlay onClick={this.handleOverlayClick} open={offscreenOpen} />
          <Header navigation={mainNavigation} socialAccounts={pageContext.layout.socialAccounts} />
          <Main>
            { pageContext.layout.before && (
              <Blocks blocks={pageContext.layout.before} />
            )}
            {children}
            { pageContext.layout.after && (
              <Blocks blocks={pageContext.layout.after} />
            )}
          </Main>
          <Footer navigation={footerNavigation} />
        </AnimatedLayout>

        { data.site.siteMetadata.useCookies && (
          <Sheet
            position="bottom"
            isOpen={this.context.cookieConsent.isOpen}
          >
            <CookieConsent onAccept={this.handleAcceptCookies} />
          </Sheet>
        )}

        <AnimatedOffscreenNavigation ctx={this.context}>
          <MainNavigation onClose={this.context.closeNavigation} navigation={mainNavigation} />
        </AnimatedOffscreenNavigation>

        {this.context.config.useTranslations && (
          <Dialog
            isOpen={this.context.languageSwitch.isOpen}
            onClose={this.context.toggleLanguageSwitch}
          >
            <LanguageSwitch
              parent={pageContext.node.treeParent}
              locales={pageContext.site.locales}
              allSlugLocales={pageContext.node.allSlugLocales}
            />
          </Dialog>
        )}

        {this.context.config.useSearch && (
          <Offscreen
            position="top"
            isOpen={this.context.search.isOpen}
            onResize={this.context.setSearchSize}
            onClose={this.context.closeSearch}
            onRest={this.context.onLayoutAnimationRest}
          >
            <Search isOpen={this.context.search.isOpen} />
          </Offscreen>
        )}
      </div>
    );
  }
}

Layout.contextType = UIContext;

export default (props) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          useCookies
        }
      }
    }
  `);
  return <Layout data={data} {...props} />;
};
