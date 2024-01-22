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
          ? 'bg-neutral-300/40 dark:bg-neutral-700/20'
          : undefined
      )}
    />
  );
}
