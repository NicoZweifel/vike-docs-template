import { usePageContext } from '../context/PageContext';
import { Image } from '@unpic/preact';
import { LinkButton } from './LinkButton';
import { GitHub } from 'react-feather';
import { NavNode } from './NavNode';

export const Footer = () => {
  const {
    pageProps: { name, navTree, license, repository, logo, author },
  } = usePageContext();
  return (
    <footer
      className={
        'flex flex-col items-center min-w-full border-t border-neutral-300/40 dark:border-neutral-800/40'
      }
    >
      <div
        className={
          'flex flex-row justify-between container py-10 sm:px-2 lg:px-6 gap-2'
        }
      >
        <div className={'flex flex-col gap-4'}>
          <a
            href={'/'}
            className={'flex flex-row place-items-center gap-2 items-stretch'}
          >
            <Image
              alt={'logo'}
              src={logo}
              className={'my-0.5'}
              layout={'fixed'}
              height={16}
              width={16}
            />
            <p className={'text font-bold flex-shrink-0'}>{name}</p>
          </a>
          <div className={'flex flex-row gap-1'}>
            <p className={'font-semibold text-sm pt-0.5'}>©</p>
            <p className={'text-sm'}>
              {new Date().getFullYear()} {author}
            </p>
          </div>
          <LinkButton
            className={'text-sm'}
            aria-label={`${license} License`}
            href={`${repository}/blob/main/LICENSE`}
          >
            {license} License
          </LinkButton>
          <div className={'flex flex-row gap-2'}>
            <LinkButton
              id={'github_button'}
              name={'Repository Button'}
              aria-label={'Navigate to repository'}
              hideExternalIcon
              href={repository}
            >
              <GitHub />
            </LinkButton>
          </div>
        </div>
        <div className={'flex-row gap-4 hidden lg:flex'}>
          {navTree?.[0] && <NavNode flex={'row'} node={navTree[0]} />}
        </div>
      </div>
    </footer>
  );
};
