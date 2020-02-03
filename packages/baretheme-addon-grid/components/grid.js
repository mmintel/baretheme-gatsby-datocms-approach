import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  Section,
  Container,
  Grid as BaseGrid,
  Image,
  Tooltip,
} from '@baretheme/ui';
import { Markdown } from '@baretheme/gatsby-theme-baretheme';

const GridImage = styled(Image)`
  min-width: 2rem;
  max-width: 5rem;
  min-height: 5rem;
  max-height: 5rem;
`;

const Grid = ({ item }) => (
  <Section>
    <Container>
      {item.text && (
        <Markdown align="center" mb={2}>{item.text}</Markdown>
      )}
      { item.items && item.items.length && (
        <BaseGrid>
          {item.items.map((gridItem) => (
            <BaseGrid.Item key={gridItem.id}>
              <Tooltip content={gridItem.title}>
                <GridImage src={gridItem.image.url} alt={gridItem.title} />
              </Tooltip>
            </BaseGrid.Item>
          ))}
        </BaseGrid>
      )}
    </Container>
  </Section>
);

Grid.propTypes = {
  item: PropTypes.shape({
    text: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      image: PropTypes.shape({
        url: PropTypes.string,
      }),
    })),
  }).isRequired,
};

export default Grid;
