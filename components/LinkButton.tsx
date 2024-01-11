import { ComponentChildren, ComponentProps } from 'preact';
import { Link } from './Link';
import { cn } from '../utils/cn';
import { ExternalLink } from 'react-feather';

export const LinkButton = ({
  className,
  hideExternalIcon,
  ...p
}: ComponentProps<typeof Link> & { hideExternalIcon?: boolean }) => (
  <Link {...p} className={cn('inline-block', className)}>
    <button
      className={
        'underline text-neutral-800/80 hover:text-neutral-600/80 dark:text-neutral-200/80 dark:hover:text-neutral-300/80 flex text-neutral-800 dark:text-neutral-200 items-center gap-1 flex-row rounded-sm px-0.5 '
      }
    >
      {(p as { children: ComponentChildren }).children}
      {((p as { href?: string }).href?.startsWith('http') ||
        (p as { href?: string }).href?.startsWith('mailto:')) &&
        !hideExternalIcon && <ExternalLink color={'currentColor'} size={14} />}
    </button>
  </Link>
);
