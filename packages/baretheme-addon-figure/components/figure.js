import React from 'react';
import PropTypes from 'prop-types';
import {
  Section, Container, Reveal, useViewportContext,
} from '@baretheme/ui';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Markdown, Image, useUI } from '@baretheme/gatsby-theme-baretheme';

const blacklistProps = ['orientation', 'reverse'];

const StyledFigure = styled('figure', {
  shouldForwardProp: (prop) => !blacklistProps.includes(prop),
})`
  display: grid;
  align-items: center;

  ${(props) => props.orientation === 'horizontal' && css`
    grid-template-columns: 1fr 1fr;
    grid-column-gap: ${props.theme.spacing(2)};
  `}

  ${(props) => props.orientation === 'vertical' && css`
    grid-row-gap: ${props.theme.spacing(2)};
  `}
`;

const Figure = ({ item }) => {
  const ui = useUI();
  const viewport = useViewportContext();
  const orientation = !viewport.media.isGreaterThan('medium') ? 'vertical' : item.orientation;
  return (
    <Section>
      <Container size={item.orientation === 'vertical' && 'small'}>
        <StyledFigure orientation={orientation} reverse={item.reverse}>
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
          <figcaption>
            <Markdown>
              {item.caption}
            </Markdown>
          </figcaption>
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
