import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { useMemo } from 'preact/hooks';

export function Link({ className, ...props }: ComponentProps<'a'>) {
  const { urlPathname } = usePageContext();

  const isParent = useMemo(
    () => props.href !== '/' && urlPathname.startsWith(props.href.toString()),
    [props.href, urlPathname]
  );

  const isActive = useMemo(
    () => urlPathname === props.href,
    [props.href, urlPathname]
  );

  return (
    <a
      {...props}
      className={cn(
        className,
        isActive
          ? 'bg-neutral-200/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-300 '
          : isParent
            ? 'bg-neutral-200/40 dark:bg-neutral-800/30 text-neutral-900 dark:text-neutral-300 '
            : undefined
      )}
    />
  );
}
