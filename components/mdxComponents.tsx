import { MDXComponents } from 'mdx/types';
import { cn } from '../utils/cn';
import { LinkButton } from './index';
import { Image } from '@unpic/preact';
import { Pre } from './Pre';
import { customComponents } from './customComponents';
import { H } from './H';

export const mdxComponents: MDXComponents = {
  ...customComponents,
  ...Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map((x) => [
      `h${x}`,
      (p) => <H className={'scroll-mt-14 '} {...p} level={x} />,
    ])
  ),
  pre: (p) => <Pre {...p} />,
  p: (p) => <p {...p} className={cn('text-base', p.className)} />,
  ul: (p) => (
    <ul {...p} className={cn('my-1 list-disc list-inside', p.className)} />
  ),
  a: (p) => <LinkButton {...p} />,
  table: (p) => <table {...p} className={cn('mt-1 mb-3', p.className)} />,
  th: (p) => (
    <td
      {...p}
      className={cn(
        'p-2 font-semibold border-b border-neutral-300/80 dark:border-neutral-700/80',
        p.className
      )}
    />
  ),
  td: (p) => (
    <td
      {...p}
      className={cn(
        'p-2 border-b border-neutral-200/80 dark:border-neutral-800/80',
        p.className
      )}
    />
  ),
  img: ({ className, ...p }) => (
    <div className={cn('my-2', className)}>
      <Image priority layout={'fullWidth'} {...p} />
    </div>
  ),
};

export default mdxComponents;
