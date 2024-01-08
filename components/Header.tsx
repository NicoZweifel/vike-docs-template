import { usePageContext } from '../renderer/usePageContext';
import { DarkModeToggle } from './DarkModeToggle';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export function Header({ className, ...props }: ComponentProps<'header'>) {
  const {
    pageProps: { name },
  } = usePageContext();
  return (
    <header
      {...props}
      className={cn(
        'fixed bg-neutral-100/60 dark:bg-neutral-950/40 flex top-0 w-full backdrop-blur flex-none border-b border-neutral-300/40 dark:border-neutral-900/60 grow justify-center z-10 ',
        className
      )}
    >
      <nav
        className={'p-2 flex flex-row container items-stretch justify-between'}
      >
        <p className={'text-lg font-bold'}>{name}</p>
        <DarkModeToggle />
      </nav>
    </header>
  );
}
