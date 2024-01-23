import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import { Options } from './services';
import packageJsonFile from './package.json';

const options: Options = {
  name: packageJsonFile.name,
  repository: packageJsonFile.repository,
  license: packageJsonFile.license,
  author: packageJsonFile.author,
  baseRoute: '/',
  logo: '/vite.svg',
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
