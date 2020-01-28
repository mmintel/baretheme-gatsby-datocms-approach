import React from "react";
import { IntlProvider } from "react-intl";
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { Container, Icon, Bootstrap, ViewportProvider } from "@baretheme/ui";
import { mdiThemeLightDark } from "@mdi/js";
import { UIContext, UIProvider, config } from "@baretheme/gatsby-theme-baretheme";

const Actions = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 1000;
`;

const ThemeDecorator = storyFn => (
  <IntlProvider>
    <UIProvider config={config}>
      <UIContext.Consumer>
        {ctx => (
          <ThemeProvider theme={ctx.theme}>
            <ViewportProvider>
              <Bootstrap />
              <Container>
                <Actions>
                  <Icon onClick={ctx.toggleTheme} path={mdiThemeLightDark} />
                </Actions>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    flexDirection: 'column',
                    padding: "2rem"
                  }}
                >
                  {storyFn()}
                </div>
              </Container>
            </ViewportProvider>
          </ThemeProvider>
        )}
      </UIContext.Consumer>
    </UIProvider>
  </IntlProvider>
);

export default ThemeDecorator;
