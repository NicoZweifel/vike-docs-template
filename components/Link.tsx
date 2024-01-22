import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export function Link({ className, ...props }: ComponentProps<'a'>) {
  const { urlPathname } = usePageContext();

  return (
    <a
      {...props}
      className={cn(
        className,
        urlPathname === props.href
          ? 'bg-neutral-200/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-300 '
          : undefined
      )}
    />
  );
}
