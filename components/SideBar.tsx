import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { NavNode } from './NavNode';

export function SideBar({ className, ...props }: ComponentProps<'nav'>) {
  const {
    pageProps: { navTree },
  } = usePageContext();

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col', className)}>
      {navTree.map((x) => (
        <NavNode key={x.name} node={x} />
      ))}
    </nav>
  );
}
