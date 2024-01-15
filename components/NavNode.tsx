import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { NavTreeNode } from '../types/NavTreeNode';
import { usePageContext } from '../context/PageContext';

export const NavNode = ({
  node,
  className,
  flex,
  ...props
}: { node: NavTreeNode; flex?: 'col' | 'row' } & Omit<
  ComponentProps<'div'>,
  'children'
>) => {
  const {
    pageProps: { baseRoute },
  } = usePageContext();
  const { name, children, path, navItems } = node;

  const isBaseRoute = name === baseRoute.replace('/', '');

  const childNodes = children
    .filter((x) => x.navItems.length > 0)
    .map((x) => (
      <NavNode key={x.name} node={x} flex={!isBaseRoute ? flex : undefined} />
    ));

  const content = (
    <div
      className={cn(
        name.length > 0 && !isBaseRoute
          ? 'ml-1 pl-2 border-l border-neutral-300/60 dark:border-neutral-800/40'
          : undefined,
        `flex flex-${flex ?? 'col'} gap-1`
      )}
    >
      <div className={`flex flex-col gap-1`}>
        {navItems.map(({ title, route }) => (
          <a
            key={route}
            className={
              'whitespace-nowrap text-sm py-1 px-2 flex items-center hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 rounded text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300 font-semibold'
            }
            href={route === '' ? '/' : route}
          >
            {title}
          </a>
        ))}
      </div>
      {childNodes}
    </div>
  );

  return isBaseRoute ? (
    content
  ) : (
    <div
      {...props}
      className={cn(`flex flex-${flex ?? 'col'} gap-1`, className)}
    >
      <>
        {name.length > 1 && (
          <a
            href={path === '' ? '/' : path}
            className={
              'text-sm font-bold text-start py-1 pl-2  hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 rounded text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300'
            }
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </a>
        )}
        {content}
      </>
    </div>
  );
};
