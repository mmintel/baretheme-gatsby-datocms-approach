import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';
import {
  CodeBlock,
  Display,
  Paragraph,
  Headline,
  List,
  TextLink,
} from '@baretheme/ui';
import { Link } from '@baretheme/gatsby-theme-baretheme';

const MarkdownContext = React.createContext(null);
function useMarkdownContext() {
  const context = React.useContext(MarkdownContext);
  if (!context) {
    throw new Error(
      'Markdown compound components cannot be rendered outside the Markdown component',
    );
  }
  return context;
}

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== 'script',
});

const ParagraphRenderer = ({ children }) => {
  const { align } = useMarkdownContext();
  return (
    <Paragraph align={align} mb={1}>{children}</Paragraph>
  );
};

const HeadlineRenderer = ({ level, children }) => {
  const { align } = useMarkdownContext();
  const sizes = {
    1: 3,
    2: 2,
    3: 1,
    4: 1,
    5: 0,
    6: 0,
  };
  return <Headline align={align} size={sizes[level]} as={`h${level}`}>{children}</Headline>;
};

const ListRenderer = ({
  ordered, tight, children,
}) => (
  <List tight={tight} type={ordered ? 'ordered' : 'unordered'} mt={0} mb={0}>
    <List.Body>
      {children}
    </List.Body>
  </List>
);

ListRenderer.defaultProps = {
  // depth: 0,
  // start: null,
  tight: false,
  ordered: false,
};

ListRenderer.propTypes = {
  // depth: PropTypes.number,
  // start: PropTypes.number,
  ordered: PropTypes.bool,
  tight: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

const ListItemRenderer = ({
  children,
}) => (
  <List.Item>
    <List.ItemText>
      {children}
    </List.ItemText>
  </List.Item>
);

ListItemRenderer.defaultProps = {
};

ListItemRenderer.propTypes = {
  children: PropTypes.node.isRequired,
};

const StrongRenderer = ({ children }) => <Display bold>{children}</Display>;
const EmphasisRenderer = ({ children }) => <Display italic>{children}</Display>;

const LinkRenderer = ({ children, href, ...props }) => (
  <TextLink {...props}>
    <Link to={href}>{children}</Link>
  </TextLink>
);

const Markdown = ({ align, ...props }) => {
  const value = React.useMemo(() => ({ align }), [align]);
  return (
    <MarkdownContext.Provider value={value}>
      <ReactMarkdown
        astPlugins={[parseHtml]}
        escapeHtml={false}
        renderers={{
          code: CodeBlock,
          paragraph: ParagraphRenderer,
          heading: HeadlineRenderer,
          list: ListRenderer,
          listItem: ListItemRenderer,
          link: LinkRenderer,
          strong: StrongRenderer,
          emphasis: EmphasisRenderer,
        }}
        {...props}
      />
    </MarkdownContext.Provider>
  );
};

export default Markdown;
