import { PageContext } from 'vike/types';

import options from '../options';

import { DocService, PageService } from '../services';
import { frontmatterProcessor } from '../utils/frontmatterProcessor';
import { tocPlugin } from '../utils/tocPlugin';
import { navGenerator } from '../utils/navGenerator';
import { sortProvider } from '../utils/sortProvider';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const opts = {
    ...options,
    route: pageContext.urlPathname,
  };

  const docService = new DocService({
    tocPlugin,
    frontmatterProcessor,
    sortProvider,
    ...opts,
  });

  const pageService = new PageService({
    navGenerator,
    ...opts,
    docService,
  });

  return (await pageService.getPages())[0];
}
