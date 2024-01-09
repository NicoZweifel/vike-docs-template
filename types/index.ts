import { VNode } from 'preact';
import { DocHeading } from './docHeading';
import { NavItem } from './NavItem';

export type { PageProps, DocHeading, NavItem };

// https://vike.dev/pageContext#typescript
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      Page: Page;
      pageProps?: PageProps;
      urlPathname: string;
      exports: {
        documentProps?: {
          title?: string;
          description?: string;
        };
      };
    }
  }
}

type Page = (pageProps: PageProps) => VNode;

type PageProps = {
  name: string;
  code: string;
  frontmatter: NavItem & {
    headings: DocHeading[];
  };
  navItems: NavItem[];
};
