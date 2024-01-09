import { MDXComponents } from 'mdx/types';
import { H } from './components/H';
import { cn } from './utils/cn';
import { Link } from './components/Link';
import { Image } from '@unpic/preact';

import { ExternalLink } from 'react-feather';
import { ComponentChildren } from 'preact';

export const mdxComponents: MDXComponents = {
  ...Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map((x) => [
      `h${x}`,
      (p) => <H className={'pt-3 scroll-mt-10'} {...p} level={x} />,
    ])
  ),
  pre: (p) => (
    <pre
      {...p}
      className={cn(
        'py-1 rounded border border-neutral-600/40 dark:border-neutral-600/60 ',
        p.className
      )}
    />
  ),
  p: (p) => <p {...p} className={cn('py-1', p.className)} />,
  ul: (p) => (
    <ul {...p} className={cn('py-2 list-disc list-inside', p.className)} />
  ),
  a: (p) => (
    <Link {...p} className={cn('inline-block', p.className)}>
      <button
        className={
          'bg-neutral-100 hover:bg-neutral-200 text-sm flex text-neutral-800 dark:text-neutral-200 items-center gap-1 flex-row rounded-sm px-0.5 dark:bg-neutral-800 dark:hover:bg-neutral-700'
        }
      >
        {(p as { children: ComponentChildren }).children}
        {((p as { href?: string }).href?.startsWith('http') ||
          (p as { href?: string }).href?.startsWith('mailto:')) && (
          <ExternalLink color={'currentColor'} size={14} />
        )}
      </button>
    </Link>
  ),
  img: (p) => (
    <Image layout={'fullWidth'} {...p} className={cn('py-2', p.className)} />
  ),
};

export default mdxComponents;
