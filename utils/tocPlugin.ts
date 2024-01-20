import { DocHeading } from '../types';
import * as unified from 'unified';
import * as unist from 'unist';
import { MdxJsxTextElement, mdxToMarkdown } from 'mdast-util-mdx';
import { toMarkdown } from 'mdast-util-to-markdown';
import { bundleMDX } from 'mdx-bundler';

export const tocPlugin =
  (headings: DocHeading[]): unified.Plugin =>
  () => {
    return async (node: unist.Parent) => {
      for (const element of node.children.filter(
        (_: unist.Node) => _.type === 'heading'
      )) {
        if (element.type === 'heading') {
          const elm = element as MdxJsxTextElement & {
            depth: 1 | 2 | 3 | 4 | 5 | 6;
          };

          const title = toMarkdown(
            { type: 'paragraph', children: elm.children },
            { extensions: [mdxToMarkdown()] }
          )
            .trim()
            .replace(/<.*$/g, '')
            .replace(/\\/g, '')
            .trim();

          const content = (
            await bundleMDX({
              source: title,
            })
          ).code;

          headings.push({ level: elm.depth, title, content });
        }
      }
    };
  };
