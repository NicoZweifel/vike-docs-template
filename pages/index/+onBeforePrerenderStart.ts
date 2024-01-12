import options from '../../options';

import { DocService, PageService } from '../../services';
import { frontmatterProcessor } from '../../utils/frontmatterProcessor';
import { tocPlugin } from '../../utils/tocPlugin';
import { navProcessor } from '../../utils/navProcessor';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
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

  return pageService.getPages();
}
