import { ConfigOptions, NavItem } from '../types';
import { IDocService } from './DocService';
import { NavTreeNode } from '../types/NavTreeNode';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NavProcessor = (frontMatter: Record<string, any>[]) => {
  navItems: NavItem[];
  navTree: NavTreeNode[];
};

export type PageServiceOptions = ConfigOptions & {
  docService: IDocService;
  navProcessor: NavProcessor;
};

export class PageService {
  constructor(private readonly options: PageServiceOptions) {}

  async getPages(route?: string) {
    const {
      docService,
      navProcessor,
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
    };

    const docs = await docService.getDocs();
    const { navItems, navTree } = navProcessor(docs.map((x) => x.frontmatter));

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
        {
          url: '/',
          pageContext: {
            pageProps: {
              ...(docs.find(
                (x) => x.frontmatter.route === '/' || x.frontmatter.route === ''
              ) ?? docs[0]),
              navItems,
              navTree,
              ...rootOptions,
            },
          },
        },
        ...docs.map((x) => {
          const pageProps = {
            ...x,
            navItems,
            navTree,
            ...rootOptions,
          };

          return {
            url: x.frontmatter.route,
            pageContext: {
              pageProps,
            },
          };
        }),
      ];
    }
  }
}
