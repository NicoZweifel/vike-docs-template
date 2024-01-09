import { usePageContext } from '../renderer/usePageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export function SideBar({ className, ...props }: ComponentProps<'nav'>) {
  const {
    pageProps: { navItems },
  } = usePageContext();

  const groups = new Set(navItems.map((x) => x.path).sort());

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col', className)}>
      {[...groups.values()].map((x) => {
        const formatted = x.replaceAll('/', ' ').trim();
        return (
          <div key={x}>
            {x.length > 1 && (
              <p
                className={
                  'text-lg font-bold text-neutral-900 dark:text-neutral-100 py-1 pt-3 px-2'
                }
              >
                {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
              </p>
            )}
            {navItems
              .filter((y) => y.path === x)
              .sort((a, b) => a.title.localeCompare(b.title))
              .map(({ title, route }) => (
                <a
                  key={route}
                  className={
                    'whitespace-nowrap py-1 px-2 flex items-center hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 rounded text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300 font-semibold'
                  }
                  href={route}
                >
                  {title}
                </a>
              ))}
          </div>
        );
      })}
    </nav>
  );
}
