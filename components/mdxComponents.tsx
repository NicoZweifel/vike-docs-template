import { MDXComponents } from 'mdx/types';
import { CheckSquare, Clipboard, Hash } from 'react-feather';
import { cn } from '../utils/cn';
import { Link, LinkButton } from './index';
import { Image } from '@unpic/preact';
import { ComponentChildren, ComponentProps, VNode } from 'preact';
import { sluggifyTitle } from '../utils/sluggifyTitle';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { copyToClipboard } from '../utils/copyToClipboard';
import { Card } from './Card';

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

const usePre = () => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClickCopy = useCallback(async () => {
    if (!preRef.current?.innerText) return;
    await copyToClipboard(preRef.current.innerText);
    setCopied(true);
  }, []);

  return useMemo(
    () => ({
      preRef,
      copied,
      handleClickCopy,
    }),
    [copied, handleClickCopy]
  );
};

function Pre({ className, children, ...props }: ComponentProps<'pre'>) {
  const { preRef, copied, handleClickCopy } = usePre();
  return (
    <pre
      {...props}
      className={cn(
        'my-1 relative group rounded border border-neutral-700/40',
        className
      )}
      ref={preRef}
    >
      <button
        type="button"
        disabled={copied}
        onClick={handleClickCopy}
        aria-label="Copy to Clipboard"
        className={`${
          copied
            ? 'text-green-300/40 shadow shadow-green-300/5 border-green-300/15 bg-green-700/5'
            : 'text-neutral-500/60 hover:shadow hover:shadow-neutral-400/5 border-neutral-700/60 hover:bg-neutral-900/20 hover:text-neutral-400/80 hover:border-neutral-400/40 hidden'
        } z-10 absolute border rounded p-2 group-hover:flex bottom-0 right-0 mb-6 mr-6`}
      >
        {copied ? <CheckSquare size={18} /> : <Clipboard size={18} />}
      </button>
      {children}
    </pre>
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
  Card,
};

export default mdxComponents;
