import { ConfigOptions, NavItem } from '../types';
import { NavTreeNode } from '../types/NavTreeNode';
import { bundleMDX } from 'mdx-bundler';
import { IMDXBundlerService } from 'mdx-butler';
import { Frontmatter } from '../types/Frontmatter';
import { Options } from './index';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavGenerator = (frontMatter: Record<string, any>[]) => {
  navItems: NavItem[];
  navTree: NavTreeNode[];
};

export type PageServiceOptions = ConfigOptions & {
  mdxBundlerService: IMDXBundlerService<Frontmatter, Options>;
  navGenerator: NavGenerator;
  route?: string;
  isApi?: boolean;
};

export class PageService {
  constructor(private readonly options: PageServiceOptions) {}

  async getPages(opts?: Partial<PageServiceOptions>) {
    const {
      mdxBundlerService,
      navGenerator,
      name,
      license,
      repository,
      logo,
      author,
      basePath,
      isApi,
      route,
    } = { ...this.options, ...opts };

    const rootOptions = {
      name,
      license,
      repository,
      logo,
      author,
      route,
      basePath,
      isApi,
    };

    if (route != undefined && !route.startsWith(basePath)) {
      return [
        {
          pageContext: {
            pageProps: rootOptions,
          },
        },
      ];
    }

    const docs = await mdxBundlerService.docs();

    await Promise.all(
      docs.map(async (x) => {
        x.frontmatter.descriptionCode =
          x.frontmatter.description != null
            ? (
                await bundleMDX({
                  source: x.frontmatter.description,
                })
              ).code
            : undefined;
      })
    );

    const { navItems, navTree } = navGenerator(docs.map((x) => x.frontmatter));

    if (route) {
      const doc =
        docs.find(
          (x) => x.frontmatter.route.toLowerCase() === route.toLowerCase()
        ) ??
        docs.find(
          (x) => x.frontmatter.path.toLowerCase() === route.toLowerCase()
        ) ??
        docs[0];

      const pageProps = {
        ...doc,
        title: doc.frontmatter.title,
        description: doc.frontmatter.description,
        navItems,
        navTree,
        ...rootOptions,
      };

      return [
        {
          pageContext: {
            pageProps,
          },
        },
      ];
    } else {
      return [
        ...docs.map((x) => {
          const pageProps = {
            ...x,
            title: x.frontmatter.title,
            description: x.frontmatter.description,
            navItems,
            navTree,
            ...rootOptions,
          };

          const url =
            (x.frontmatter.route?.length ?? 0) === 0
              ? '/'
              : x.frontmatter.route;

          return {
            url,
            pageContext: {
              pageProps,
            },
          };
        }),
      ];
    }
  }
}
