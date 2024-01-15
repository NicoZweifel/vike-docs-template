import { bundleMDX } from 'mdx-bundler';
import path from 'path';
import { glob } from 'glob';
import { ConfigOptions, DocHeading } from '../types';
import * as unified from 'unified';

export type MDXBundlerOptions = Omit<
  Parameters<typeof bundleMDX>[0],
  'file' | 'cwd' | 'source' | 'mdxOptions'
> & { mdxOptions?: MDXOptions };

export type MDXOptions = Parameters<
  Parameters<typeof bundleMDX>[0]['mdxOptions']
>[0];

export type DocServiceOptions = ConfigOptions & {
  pattern: string;
  cwd: string;
  toc: boolean;
  mdxBundlerOptions: MDXBundlerOptions;
  frontmatterProcessor?: FrontmatterProcessor;
  sortProvider?: sortProvider<Awaited<ReturnType<typeof bundleMDX>>>;
  tocPlugin?: (headings: DocHeading[]) => unified.Plugin;
  route?: string;
};

export interface IDocService {
  getDocs(
    opts?: DocServiceOptions
  ): Promise<Awaited<ReturnType<typeof bundleMDX>>[]>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UnknownFrontMatter = Record<string, any>;

export type FrontmatterProcessor = (
  cwd: string,
  file: string,
  baseRoute: string,
  frontmatter: UnknownFrontMatter
) => void;

export type sortProvider<
  T extends { frontmatter: UnknownFrontMatter } = {
    frontmatter: UnknownFrontMatter;
  },
> = (pages: T[]) => T[];

export class DocService implements IDocService {
  constructor(private readonly options: DocServiceOptions) {}

  async getDocs(
    opts?: Partial<DocServiceOptions>
  ): Promise<Awaited<ReturnType<typeof bundleMDX>>[]> {
    const options = {
      ...this.options,
      ...opts,
    };

    const {
      pattern,
      sortProvider,
      mdxBundlerOptions,
      toc,
      frontmatterProcessor,
      tocPlugin,
      baseRoute,
    } = options;

    let route = options.route;

    // absolute
    const cwd = path.join(process.cwd(), options.cwd);

    const files = await glob(pattern, { ignore: 'node_modules/**', cwd });
    const res: ReturnType<typeof bundleMDX>[] = [];

    for (const file of files) {
      const filePath = path.join(cwd, file);

      res.push(
        new Promise((resolve, reject) =>
          bundleMDX({
            ...mdxBundlerOptions,
            file: filePath,
            cwd,
            mdxOptions: (processorOptions, frontmatter) => {
              frontmatterProcessor?.(options.cwd, file, baseRoute, frontmatter);
              if (route === '/') route = '';
              if (
                route &&
                route.toLowerCase() !== frontmatter.route.toLowerCase() &&
                route.toLowerCase() !== frontmatter.path.toLowerCase()
              ) {
                resolve({
                  frontmatter,
                  errors: [],
                  code: '',
                  matter: {} as never,
                });
              }

              // this is the recommended way to add custom remark/rehype plugins:
              // The syntax might look weird, but it protects you in case we add/remove
              // plugins in the future.
              processorOptions.remarkPlugins = [
                toc && tocPlugin ? tocPlugin(frontmatter.headings) : [],
                ...(processorOptions.remarkPlugins ?? []),
                ...(mdxBundlerOptions.mdxOptions.remarkPlugins ?? []),
              ];
              processorOptions.rehypePlugins = [
                ...(processorOptions.rehypePlugins ?? []),
                ...(mdxBundlerOptions.mdxOptions.rehypePlugins ?? []),
              ];

              return {
                ...processorOptions,
                ...mdxBundlerOptions.mdxOptions,
                remarkPlugins: processorOptions.remarkPlugins,
                rehypePlugins: processorOptions.rehypePlugins,
              };
            },
          })
            .then(resolve)
            .catch(reject)
        )
      );
    }

    return Promise.all(res).then(sortProvider);
  }
}
