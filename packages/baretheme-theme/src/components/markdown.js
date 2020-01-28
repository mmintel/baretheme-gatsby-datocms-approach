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
  Button,
} from '@baretheme/ui';
import { Link, useUI } from '@baretheme/gatsby-theme-baretheme';

const parseHtml = htmlParser({
  isValidNode: (node) => node.type !== 'script',
});

const Markdown = ({ align, ...props }) => {
  const ui = useUI();

  const StrongRenderer = ({ children }) => <Display bold>{children}</Display>;
  StrongRenderer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const EmphasisRenderer = ({ children }) => <Display italic>{children}</Display>;
  EmphasisRenderer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const LinkRenderer = ({ children, href, ...props }) => (
    <TextLink {...props}>
      <Link to={href}>{children}</Link>
    </TextLink>
  );
  LinkRenderer.propTypes = {
    children: PropTypes.node.isRequired,
    href: PropTypes.string.isRequired,
  };

  const ParagraphRenderer = ({ children }) => (
    <Paragraph align={align} mb={1}>{children}</Paragraph>
  );
  ParagraphRenderer.propTypes = {
    children: PropTypes.node.isRequired,
  };

  const HeadlineRenderer = ({ level, children }) => {
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
  HeadlineRenderer.propTypes = {
    children: PropTypes.node.isRequired,
    level: PropTypes.number.isRequired,
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
    tight: false,
    ordered: false,
  };

  ListRenderer.propTypes = {
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

  const HTMLParser = ({ element, children }) => {
    let Component = element;
    let onClick = () => {};
    if (element.type === 'button') Component = Button;
    if (element.props.toggletheme) {
      onClick = () => ui.toggleTheme();
    }
    return <Component onClick={onClick} {...element.props}>{children}</Component>;
  };

  HTMLParser.propTypes = {
    element: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
  };

  return (
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
        parsedHtml: HTMLParser,
      }}
      {...props}
    />
  );
};

Markdown.defaultProps = {
  align: 'left',
};

Markdown.propTypes = {
  align: PropTypes.oneOf(['left', 'center', 'right']),
};

export default Markdown;
