import { MDXComponents } from 'mdx/types';
import { Hash } from 'react-feather';
import { cn } from '../utils/cn';
import { Link, LinkButton } from './index';
import { Image } from '@unpic/preact';
import { ComponentChildren, ComponentProps, VNode } from 'preact';
import { sluggifyTitle } from '../utils/sluggifyTitle';
import { Pre } from './Pre';

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
    <Link
      className={
        'flex items-center group flex-row -ml-5 pt-3 gap-1 hover:text-neutral-700 dark:hover:text-neutral-300'
      }
      href={`#${slug}`}
    >
      <div className={'mt-0.5 invisible group-hover:visible'}>
        <Hash size={16} />
      </div>
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
      <Image layout={'fullWidth'} {...p} />
    </div>
  ),
};

export default mdxComponents;
