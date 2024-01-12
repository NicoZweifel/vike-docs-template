import { PageContext } from 'vike/types';

import options from '../options';

import { DocService, PageService } from '../services';
import { frontmatterProcessor } from '../utils/frontmatterProcessor';
import { tocPlugin } from '../utils/tocPlugin';
import { navProcessor } from '../utils/navProcessor';

export { onBeforeRender };

async function onBeforeRender(pageContext: PageContext) {
  const docService = new DocService({
    tocPlugin,
    frontmatterProcessor,
    ...options,
  });

  const pageService = new PageService({
    navProcessor,
    ...options,
    docService,
  });

  return (await pageService.getPages(pageContext.urlPathname))[0];
}
