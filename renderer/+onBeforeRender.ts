import { PageContext } from 'vike/types';

import options from '../options';

import { DocService, PageService } from '../services';
import { frontmatterProcessor } from '../utils/frontmatterProcessor';
import { tocPlugin } from '../utils/tocPlugin';
import { navGenerator } from '../utils/navGenerator';
import { sortProvider } from '../utils/sortProvider';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const docService = new DocService({
    route: pageContext.urlPathname,
    tocPlugin,
    frontmatterProcessor,
    sortProvider,
    ...options,
  });

  const pageService = new PageService({
    navGenerator,
    ...options,
    docService,
  });

  return (await pageService.getPages(pageContext.urlPathname))[0];
}
