import { ConfigOptions, NavItem } from '../types';
import { IDocService } from './DocService';
import { NavTreeNode } from '../types/NavTreeNode';
import { bundleMDX } from 'mdx-bundler';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavGenerator = (frontMatter: Record<string, any>[]) => {
  navItems: NavItem[];
  navTree: NavTreeNode[];
};

export type PageServiceOptions = ConfigOptions & {
  docService: IDocService;
  navGenerator: NavGenerator;
};

export class PageService {
  constructor(private readonly options: PageServiceOptions) {}

  async getPages(route?: string) {
    const {
      docService,
      navGenerator,
      name,
      license,
      repository,
      logo,
      author,
    } = this.options;

    const rootOptions = {
      name,
      license,
      repository,
      logo,
      author,
      route,
    };

    const docs = await docService.getDocs();

    await Promise.all(
      docs.map(async (x) => {
        x.frontmatter.description =
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
      const pageProps = {
        ...(docs.find(
          (x) => x.frontmatter.route.toLowerCase() === route.toLowerCase()
        ) ??
          docs.find(
            (x) => x.frontmatter.path.toLowerCase() === route.toLowerCase()
          ) ??
          docs[0]),
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
            navItems,
            navTree,
            ...rootOptions,
          };

          return {
            url: x.frontmatter.route === '' ? '/' : x.frontmatter.route,
            pageContext: {
              pageProps,
            },
          };
        }),
      ];
    }
  }
}
