import { MDXComponents } from 'mdx/types';
import { H } from './components/H';
import { cn } from './utils/cn';
import { Link } from './components/Link';

export const mdxComponents: MDXComponents = {
  ...Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map((x) => [
      `h${x}`,
      (p) => <H className={'py-1 scroll-mt-10'} {...p} level={x} />,
    ])
  ),
  pre: (p) => <pre {...p} className={cn(p.className, 'py-1 rounded')} />,
  p: (p) => <p {...p} className={cn(p.className, 'py-1')} />,
  ul: (p) => (
    <ul {...p} className={cn(p.className, 'py-1 list-disc list-inside')} />
  ),
  a: (p) => <Link {...p} />,
};

export default mdxComponents;
