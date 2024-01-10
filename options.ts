import { BundleMDXOptions } from './utils/bundleMDX';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';

const options: BundleMDXOptions = {
  name: 'vike-docs-template',
  pattern: '**/*.mdx',
  cwd: '/docs',
  toc: true,
  mdxBundlerOptions: {
    mdxOptions: {
      jsxImportSource: 'preact',
      remarkPlugins: [remarkGfm, remarkFrontmatter, remarkMdxFrontmatter],
      rehypePlugins: [
        [
          rehypePrism,
          {
            defaultLanguage: 'bash',
          },
        ],
        rehypeSlug,
      ],
    },
  },
};

export default options;
