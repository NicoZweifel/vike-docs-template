import options from '../../options';

import { Options, PageService } from '../../services';
import { frontmatterProcessor } from '../../utils/frontmatterProcessor';
import { navGenerator } from '../../utils/navGenerator';
import { sortProvider } from '../../utils/sortProvider';
import { MDXBundlerService } from 'mdx-butler';
import { Frontmatter } from '../../types/Frontmatter';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const mdxBundlerService = MDXBundlerService.create<Frontmatter, Options>({
    sortProvider,
    frontmatterProcessor,
    ...options,
  });

  const pageService = new PageService({
    navGenerator,
    ...options,
    mdxBundlerService,
  });

  return pageService.getPages();
}
