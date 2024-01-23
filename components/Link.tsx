import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { useMemo } from 'preact/hooks';

const useLink = ({ href }: Pick<ComponentProps<'a'>, 'href'>) => {
  const { urlPathname } = usePageContext();

  return useMemo(
    () => ({
      isParent: href !== '/' && urlPathname.startsWith(href.toString()),
      isActive: urlPathname === href,
    }),
    [href, urlPathname]
  );
};

export function Link({ className, href, ...props }: ComponentProps<'a'>) {
  const { isParent, isActive } = useLink({
    href,
  });

  return (
    <a
      {...props}
      href={href}
      className={cn(
        className,
        isActive
          ? 'font-semibold bg-neutral-200/80 dark:bg-neutral-800/60 text-neutral-900 dark:text-neutral-300'
          : isParent
            ? 'font-bold text-neutral-950/80 dark:text-neutral-100'
            : undefined
      )}
    />
  );
}
