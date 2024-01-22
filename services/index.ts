import { DocService, DocServiceOptions } from './DocService';
import { PageService, PageServiceOptions, NavGenerator } from './PageService';
import { ConfigOptions } from '../types';

export { PageService, DocService };
export type { NavGenerator, DocServiceOptions, PageServiceOptions };
export type Options = ConfigOptions &
  Omit<DocServiceOptions, keyof ConfigOptions> &
  Partial<Pick<PageServiceOptions, 'navGenerator'>>;
