import { VNode } from "preact";
import { DocHeading } from "../types/docHeading";

export type { PageProps };

// https://vike.dev/pageContext#typescript
declare global {
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

type FrontMatterKeys = "title" | "path" | "route" | "description";

type PageProps = {
  name: string;
  code: string;
  frontmatter: Record<FrontMatterKeys, string> & { headings: DocHeading[] };
  navItems: { [key in FrontMatterKeys]: string }[];
};
