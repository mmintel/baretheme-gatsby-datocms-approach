import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { FormattedMessage, useIntl } from 'react-intl';
import { Index } from 'elasticlunr';

import {
  Container,
  Dropdown,
  List,
  Chip,
  Field,
  Display,
  TextLink,
} from '@baretheme/ui';

const StyledResults = styled.div`
  min-width: 15rem;
`;

const ResultLocale = styled.span`
  margin-left: ${(props) => props.theme.spacing(-1)};
`;

const ResultTags = styled.span`
  margin-left: ${(props) => props.theme.spacing(-1)};
`;

const ResultList = ({ results, head }) => {
  const intl = useIntl();
  return (
    <List>
      <List.Head>
        <List.Title>{head}</List.Title>
      </List.Head>
      <List.Body>
        {results.map((page) => {
          let path = `/${page.locale}/${page.path}`;

          if (intl.defaultLocale === page.locale) {
            path = `/${page.path}`;
          }

          const showLocale = intl.locale !== page.locale;

          return (
            <List.Item key={page.id}>
              <List.ItemText>
                <Display>
                  <TextLink as={Link} to={path}>
                    {page.title}
                  </TextLink>
                  {showLocale && (
                    <ResultLocale>
                      <Chip uppercase>{page.locale}</Chip>
                    </ResultLocale>
                  )}
                  {!!(page.tags && page.tags.length) && (
                    <ResultTags>
                      {page.tags.map((tag) => (
                        <Chip key={tag.id}>{tag.title}</Chip>
                      ))}
                    </ResultTags>
                  )}
                </Display>
              </List.ItemText>
            </List.Item>
          );
        })}
      </List.Body>
    </List>
  );
};

ResultList.defaultProps = {
  results: [],
};

ResultList.propTypes = {
  head: PropTypes.node.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      locale: PropTypes.string,
      id: PropTypes.id,
      title: PropTypes.string,
      tags: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        }),
      ),
    }),
  ),
};

const NoResults = styled.div`
  text-align: center;
`;

const SearchResults = ({ query, results }) => {
  const intl = useIntl();
  const resultsOfCurrentLocale = results.filter(
    (result) => result.locale === intl.locale,
  );
  const resultsOfOtherLocales = results.filter(
    (result) => result.locale !== intl.locale,
  );
  const hasCurrentLocaleResults = !!(
    resultsOfCurrentLocale && resultsOfOtherLocales.length
  );
  const hasOtherLocalesResults = !!(
    resultsOfOtherLocales && resultsOfOtherLocales.length
  );
  return (
    <StyledResults>
      {!hasCurrentLocaleResults && !hasOtherLocalesResults && (
        <NoResults>
          <Display bold align="center" size={-1} color="highlight">
            <FormattedMessage
              id="noSearchResults"
              defaultMessage='Sorry nothing found for "{query}".'
              values={{ query }}
            />
          </Display>
        </NoResults>
      )}
      {hasCurrentLocaleResults && (
        <ResultList
          results={resultsOfCurrentLocale}
          head={(
            <FormattedMessage
              id="searchResults"
              defaultMessage="Search results"
            />
          )}
        />
      )}
      {hasOtherLocalesResults && (
        <ResultList
          results={resultsOfOtherLocales}
          head={(
            <FormattedMessage
              id="searchResultsOfOtherLocales"
              defaultMessage="Found in other languages"
            />
          )}
        />
      )}
    </StyledResults>
  );
};

SearchResults.defaultProps = {
  results: [],
  query: undefined,
};

SearchResults.propTypes = {
  query: PropTypes.string,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      locale: PropTypes.string,
    }),
  ),
};

const Search = ({ isOpen, index }) => {
  const [query, setQuery] = useState();
  const [results, setResults] = useState();
  const intl = useIntl();
  let searchIndex;

  useEffect(() => {
    setQuery('');
    setResults([]);
  }, [isOpen]);

  const getOrCreateIndex = () => searchIndex || Index.load(index);

  const search = (e) => {
    const query = e.target.value;

    searchIndex = getOrCreateIndex();

    const searchResults = searchIndex
      .search(query, { expand: true })
      .map(({ ref }) => searchIndex.documentStore.getDoc(ref));

    setQuery(query);
    setResults(searchResults);
  };

  return (
    <Container>
      <Dropdown
        trigger="manual"
        hideOnClick={false}
        content={<SearchResults query={query} results={results} />}
        visible={!!(isOpen && query && query.length)}
      >
        <Field
          blank
          focus={isOpen}
          align="center"
          type="search"
          name="search"
          placeholder={intl.formatMessage({
            id: 'searchPlaceholder',
            defaultMessage: 'Search...',
          })}
          value={query}
          onChange={search}
        />
      </Dropdown>
    </Container>
  );
};

Search.defaultProps = {
  isOpen: false,
};

Search.propTypes = {
  isOpen: PropTypes.bool,
  index: PropTypes.shape({
    documentStore: PropTypes.shape({
      getDoc: PropTypes.func,
    }),
  }).isRequired,
};

export default ({ ...props }) => {
  const data = useStaticQuery(graphql`
    query SearchIndexQuery {
      siteSearchIndex {
        index
      }
    }
  `);
  return <Search index={data.siteSearchIndex.index} {...props} />;
};
