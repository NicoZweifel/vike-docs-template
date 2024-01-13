import { DocService, DocServiceOptions } from './DocService';
import { PageService, PageServiceOptions, NavGenerator } from './PageService';

export { PageService, DocService };
export type { NavGenerator, DocServiceOptions, PageServiceOptions };
export type Options = DocServiceOptions &
  Partial<Pick<PageServiceOptions, 'navGenerator'>>;
