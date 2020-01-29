import React from 'react';
import PropTypes from 'prop-types';
import {
  Section, Container, Reveal,
} from '@baretheme/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown, Image, useUI } from '@baretheme/gatsby-theme-baretheme';

const blacklistProps = ['orientation', 'reverse', 'shrink'];

const StyledFigure = styled('div', {
  shouldForwardProp: (prop) => !blacklistProps.includes(prop),
})`
  display: grid;
  align-items: center;
  grid-column-gap: ${(props) => props.theme.spacing(2)};
  grid-row-gap: ${(props) => props.theme.spacing(2)};

  ${(props) => props.theme.breakpoint('medium')} {
    ${(props) => props.orientation === 'horizontal' && css`
      grid-template-columns: 1fr 1fr;
    `}
  }

  ${(props) => props.shrink && css`
    grid-column-gap: ${props.theme.spacing(1)};
  `}

  ${(props) => props.dense && css`
    grid-auto-flow: dense;
  `}
`;

const Figure = ({ item }) => {
  const ui = useUI();
  return (
    <Section>
      <Container size={item.orientation === 'vertical' ? 'small' : 'medium'}>
        <StyledFigure orientation={item.orientation} reverse={item.reverse}>
          <Reveal once>
            { item.light && item.dark && (
              <>
                { ui.theme.name === 'light' && item.light && (
                  <Image title={item.light.title} fluid={item.light.fluid} />
                )}
                { ui.theme.name === 'dark' && item.dark && (
                  <Image title={item.light.title} fluid={item.dark.fluid} />
                )}
              </>
            )}
            { item.light && !item.dark && (
              <Image title={item.light.title} fluid={item.light.fluid} />
            )}
            { item.dark && !item.light && (
              <Image title={item.light.title} fluid={item.dark.fluid} />
            )}
          </Reveal>
          <div>
            <Markdown>
              {item.caption}
            </Markdown>
          </div>
        </StyledFigure>
      </Container>
    </Section>
  );
};

Figure.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    caption: PropTypes.string,
    light: PropTypes.object,
    dark: PropTypes.object,
    reverse: PropTypes.bool,
    orientation: PropTypes.oneOf(['horizontal', 'vertical']),
  }).isRequired,
};

export default Figure;
