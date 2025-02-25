import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import { MDXRemoteProps } from 'next-mdx-remote/rsc';
import type { Element } from 'hast';
import type { BundledHighlighterOptions, BundledLanguage, BundledTheme } from 'shiki';

// Configure rehype-pretty-code options
const prettyCodeOptions = {
  // Use a theme that works well with your site's color scheme
  theme: 'github-dark',
  // Use the new Shiki API
  getHighlighter: async (options: BundledHighlighterOptions<BundledLanguage, BundledTheme>) => {
    const { createHighlighter } = await import('shiki');
    return await createHighlighter(options);
  },
  onVisitLine(node: Element) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{ type: 'text', value: ' ' }];
    }
  },
  // Feel free to add classNames that suit your docs
  onVisitHighlightedLine(node: Element) {
    if (!node.properties) node.properties = {};
    node.properties.className = Array.isArray(node.properties.className)
      ? [...node.properties.className, 'highlighted']
      : ['highlighted'];
  },
  onVisitHighlightedWord(node: Element) {
    if (!node.properties) node.properties = {};
    node.properties.className = ['word'];
  },
};

// MDX configuration options
export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    format: 'mdx',
    remarkPlugins: [
      remarkMath,  // Support for mathematical equations
      remarkGfm,   // Support for GitHub Flavored Markdown
    ],
    rehypePlugins: [
      [rehypeKatex, { strict: true }],  // LaTeX math rendering
      [rehypePrettyCode, prettyCodeOptions],  // Code syntax highlighting
    ],
  },
}; 