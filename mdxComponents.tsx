import { MDXComponents } from 'mdx/types';
import { cn } from './utils/cn';
import { Link } from './components';
import { Image } from '@unpic/preact';

import { ExternalLink } from 'react-feather';
import { ComponentChildren, ComponentProps, VNode } from 'preact';
import { sluggifyTitle } from './utils/sluggifyTitle';

type HeadingsType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const getNodeText = (node: ComponentChildren): string => {
  switch (typeof node) {
    case 'string':
      return node;
    case 'number':
      return node.toString();
    case 'object':
      if (node instanceof Array) return node.map(getNodeText).join('');
      if ((node as VNode)?.props?.children)
        return getNodeText((node as VNode).props.children);
  }

  return '';
};

function H({
  level,
  className,
  children,
  ...props
}: { level: 1 | 2 | 3 | 4 | 5 | 6 } & ComponentProps<HeadingsType>) {
  const slug = sluggifyTitle(getNodeText(children));
  let c = 'font-bold';
  switch (level) {
    case 1:
      c = cn(c, 'text-4xl');
      break;
    case 2:
      c = cn(c, 'text-3xl');
      break;
    case 3:
      c = cn(c, 'text-2xl');
      break;
    case 4:
      c = cn(c, 'text-xl');
      break;
    case 5:
      c = cn(c, 'text-lg');
      break;
  }

  const Component: HeadingsType = `h${level}`;

  return (
    <Link href={`#${slug}`}>
      <Component {...props} className={cn(c, className)}>
        {children}
      </Component>
    </Link>
  );
}

export const mdxComponents: MDXComponents = {
  ...Object.fromEntries(
    ([1, 2, 3, 4, 5, 6] as const).map((x) => [
      `h${x}`,
      (p) => (
        <H
          className={
            'pt-3 scroll-mt-10 hover:text-neutral-700 dark:hover:text-neutral-300'
          }
          {...p}
          level={x}
        />
      ),
    ])
  ),
  pre: (p) => (
    <pre
      {...p}
      className={cn('my-1 rounded border border-neutral-700/40', p.className)}
    />
  ),
  p: (p) => <p {...p} className={cn('text-base', p.className)} />,
  ul: (p) => (
    <ul {...p} className={cn('my-1 list-disc list-inside', p.className)} />
  ),
  a: (p) => (
    <Link {...p} className={cn('inline-block', p.className)}>
      <button
        className={
          'text-neutral-900/80 hover:text-neutral-700/80 dark:text-neutral-100/80 dark:hover:text-neutral-200/80 flex text-neutral-800 dark:text-neutral-200 items-center gap-1 flex-row rounded-sm px-0.5 '
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
      <Image layout={'fullWidth'} {...p} />
    </div>
  ),
};

export default mdxComponents;
