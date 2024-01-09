import { VNode } from 'preact';
import { DocHeading } from '../types/docHeading';

export type { PageProps };

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

type FrontMatterKeys = 'title' | 'path' | 'route';
type OptionalFrontMatterKeys = 'description' | 'order';

type PageProps = {
  name: string;
  code: string;
  frontmatter: Record<FrontMatterKeys, string> &
    Partial<Record<OptionalFrontMatterKeys, string>> & {
      headings: DocHeading[];
    };
  navItems: (Record<FrontMatterKeys, string> &
    Partial<Record<OptionalFrontMatterKeys, string>>)[];
};
