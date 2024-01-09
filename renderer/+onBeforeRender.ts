import { PageContext } from 'vike/types';

import { getDocs } from '../utils/getDocs';
import options from '../options';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const docs = await getDocs();

  const pageProps = {
    ...(docs.find((x) => x.frontmatter.route === pageContext.urlPathname) ??
      docs.find((x) => x.frontmatter.path === pageContext.urlPathname) ??
      docs[0]),
    navItems: docs
      .filter((x) => x.frontmatter.hidden !== true)
      .map((x) => ({
        route: x.frontmatter.route,
        title: x.frontmatter.title,
        path: x.frontmatter.path,
        order: x.frontmatter.order,
      })),
    name: options.name,
  };

  return {
    pageContext: {
      pageProps,
    },
  };
}
