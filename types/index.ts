import { VNode } from 'preact';
import { DocHeading } from './DocHeading';
import { NavItem } from './NavItem';
import { ConfigOptions } from './ConfigOptions';
import { NavTreeNode } from './NavTreeNode';
import { Frontmatter } from './Frontmatter';

export type { PageProps, DocHeading, NavItem, ConfigOptions };

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
  code: string;
  title: string;
  description: string;
  frontmatter: Frontmatter;
  navItems: NavItem[];
  navTree: NavTreeNode[];
} & ConfigOptions;
