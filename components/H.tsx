import { ComponentChildren, ComponentProps, VNode } from 'preact';
import { sluggifyTitle } from '../utils/sluggifyTitle';
import { cn } from '../utils/cn';
import { Link } from './Link';
import { Hash } from 'react-feather';

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

export function H({
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
