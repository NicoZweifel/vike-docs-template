import { usePageContext } from '../context/PageContext';
import { DarkModeToggle } from './DarkModeToggle';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { Image } from '@unpic/preact';

export function Header({ className, ...props }: ComponentProps<'header'>) {
  const {
    pageProps: { name, logo },
  } = usePageContext();
  return (
    <header
      {...props}
      className={cn(
        'fixed bg-neutral-100/60 dark:bg-neutral-950/40 flex top-0 w-full backdrop-blur flex-none border-b border-neutral-300/40 dark:border-neutral-800/40 grow justify-center z-10 ',
        className
      )}
    >
      <nav
        className={
          'py-2 px-2 sm:px-4 lg:px-8 flex flex-row container items-stretch justify-between'
        }
      >
        <a href={'/'}>
          <div className={'flex flex-row place-items-center gap-2'}>
            <Image
              alt={'Logo'}
              src={logo}
              layout={'fixed'}
              height={20}
              width={20}
            />
            <p className={'text-lg font-bold'}>{name}</p>
          </div>
        </a>
        <DarkModeToggle />
      </nav>
    </header>
  );
}
