import { usePageContext } from '../renderer/usePageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export function SideBar({ className, ...props }: ComponentProps<'nav'>) {
  const {
    pageProps: { navItems },
  } = usePageContext();

  const groups = new Set(navItems.map((x) => x.path));

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col', className)}>
      {[...groups.values()].map((x) => (
        <div key={x}>
          {x.length > 1 && (
            <p
              className={
                'text-lg font-bold text-neutral-900 dark:text-neutral-100 py-1 pt-3 px-2'
              }
            >
              {x.replaceAll('/', ' ').trim()}
            </p>
          )}
          {navItems
            .filter((y) => y.path === x)
            .map(({ title, route }) => (
              <a
                key={route}
                className={
                  'whitespace-nowrap py-1 px-2 flex items-center hover:bg-neutral-100/80 dark:hover:bg-neutral-900/60 rounded text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300 font-semibold'
                }
                href={route}
              >
                {title}
              </a>
            ))}
        </div>
      ))}
    </nav>
  );
}
