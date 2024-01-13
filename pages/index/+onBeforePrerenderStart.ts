import options from '../../options';

import { DocService, PageService } from '../../services';
import { frontmatterProcessor } from '../../utils/frontmatterProcessor';
import { tocPlugin } from '../../utils/tocPlugin';
import { navGenerator } from '../../utils/navGenerator';
import { sortProvider } from '../../utils/sortProvider';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const docService = new DocService({
    tocPlugin,
    sortProvider,
    frontmatterProcessor,
    ...options,
  });

  const pageService = new PageService({
    navGenerator,
    ...options,
    docService,
  });

  return pageService.getPages();
}
