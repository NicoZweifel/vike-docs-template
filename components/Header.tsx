import { usePageContext } from '../context/PageContext';
import { DarkModeToggle } from './DarkModeToggle';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { Image } from '@unpic/preact';
import { GitHub, Menu } from 'react-feather';
import { NavNode } from './NavNode';
import { useSignal } from '@preact/signals';
import { LinkButton } from './LinkButton';

export function Header({ className, ...props }: ComponentProps<'header'>) {
  const {
    pageProps: { name, repository, logo, navTree },
  } = usePageContext();
  const expanded = useSignal(false);
  return (
    <header
      {...props}
      className={cn(
        'fixed bg-neutral-100/60 dark:bg-neutral-950/40 flex flex-col top-0 w-full backdrop-blur flex-none border-b border-neutral-300/40 dark:border-neutral-800/40 grow items-center z-10 ',
        className
      )}
    >
      <nav
        className={'py-2 px-2 sm:px-4 lg:px-8 flex flex-col container gap-2'}
      >
        <div className={'flex flex-row items-stretch justify-between'}>
          <a href={'/'}>
            <div className={'flex flex-row place-items-center gap-2'}>
              <Image
                alt={'Logo'}
                src={logo}
                layout={'fixed'}
                height={20}
                width={20}
              />
              <p
                className={
                  'text-lg font-bold shrink-0 text-ellipsis overflow-hidden'
                }
              >
                {name}
              </p>
            </div>
          </a>
          <div className={'flex flex-row gap-2 '}>
            <div className={'flex place-items-center'}>
              <LinkButton
                className={
                  'px-0.5 py-1 grow rounded-xl hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 dark:hover:text-neutral-30 text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-300 dark:text-neutral-100 '
                }
                id={'github_button'}
                name={'Repository Button'}
                aria-label={'Navigate to repository'}
                hideExternalIcon
                href={repository}
              >
                <GitHub size={18} />
              </LinkButton>
            </div>
            <DarkModeToggle />
            <button
              onClick={() => (expanded.value = !expanded.value)}
              aria-label={'Expand/Collapse the navigation menu'}
              className={
                'place-items-center lg:hidden py-0 px-1.5 rounded flex hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 text-neutral-600/80 hover:text-neutral-800/80 dark:text-neutral-300/80 dark:hover:text-neutral-200/80 text-neutral-800 dark:text-neutral-200 '
              }
            >
              <Menu />
            </button>
          </div>
        </div>
        <div
          className={`flex-row overflow-auto gap-4 ${expanded.value ? 'flex lg:hidden' : 'hidden'} pt-2 border-t border-neutral-300/40 dark:border-neutral-800/40 `}
        >
          {navTree?.[0] && <NavNode flex={'row'} node={navTree[0]} />}
        </div>
      </nav>
    </header>
  );
}
