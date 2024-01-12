import { DocService, DocServiceOptions } from './DocService';
import { PageService, PageServiceOptions, NavProcessor } from './PageService';

export { PageService, DocService };
export type { NavProcessor, DocServiceOptions, PageServiceOptions };
export type Options = DocServiceOptions &
  Partial<Pick<PageServiceOptions, 'navProcessor'>>;
