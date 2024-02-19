import { PageService, PageServiceOptions, NavGenerator } from './PageService';
import { ConfigOptions } from '../types';
import { MDXBundlerServiceBaseOptions } from 'mdx-butler';
import { Frontmatter } from '../types/Frontmatter';

export { PageService };
export type { NavGenerator, PageServiceOptions };
export type Options = ConfigOptions &
  Omit<MDXBundlerServiceBaseOptions<Frontmatter>, keyof ConfigOptions> &
  Partial<Pick<PageServiceOptions, 'navGenerator'>>;
