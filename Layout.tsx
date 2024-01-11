import './index.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';
import { Image } from '@unpic/preact';

import { PageHeader, TableOfContents, SideBar, Header } from './components';
import { VNode } from 'preact';
import { usePageContext } from './context/PageContext';
import { GitHub } from 'react-feather';
import { LinkButton } from './components/LinkButton';

export function Layout({ children }: { children: VNode }) {
  const {
    pageProps: { name, navItems, license, repository, frontmatter },
  } = usePageContext();
  const groups = [
    ...new Set(
      navItems
        .map((x) => x.path.split('/').filter((x) => x.length > 0)[0])
        .filter((x) => x != undefined)
        .sort()
    ),
  ];
  console.log(groups);
  return (
    <div
      className={
        'min-h-screen min-w-full flex flex-col items-center justify-start bg-white dark:bg-neutral-950 dark:text-white'
      }
    >
      <Header />
      <div
        className={
          'flex flex-row container items-stretch pt-11 sm:px-2 lg:px-4 sm:gap-4 lg:gap-8'
        }
      >
        <SideBar
          style={{
            scrollbarGutter: 'stable',
            maxHeight: `calc(100vh - 2.75rem)`,
          }}
          className={
            'sticky top-11 shrink-0 overflow-y-auto hidden lg:flex border-r border-neutral-300/40 dark:border-neutral-800/40'
          }
        />
        <div className={'px-2 py-4 flex shrink-1 flex-col grow gap-1'}>
          <PageHeader />
          <main className={'flex flex-col gap-2'}>{children}</main>
          <footer
            className={
              'border-t flex flex-row justify-between mt-4 pb-4 pt-6 border-neutral-300/40 dark:border-neutral-800/40'
            }
          >
            <div className={'text-sm'}>
              <p className={'pl-1'}>Was this article helpful to you?</p>
              <LinkButton
                hideExternalIcon
                href={`${repository}/issues`}
                className={'flex flex-row gap-1 items-center'}
              >
                <GitHub size={14} /> Provide Feedback
              </LinkButton>
            </div>
            <div className={'text-sm'}>
              <p className={'pl-1'}>Last edited: {frontmatter.lastEdited}</p>
              <LinkButton
                hideExternalIcon
                href={`${repository}/blob/main${
                  frontmatter.cwd.split(name)[1]
                }/${frontmatter.path}${frontmatter.file}`}
                className={'flex flex-row gap-1 items-center text-sm'}
              >
                <GitHub size={14} /> Edit this page
              </LinkButton>
            </div>
          </footer>
        </div>
        <TableOfContents
          style={{
            scrollbarGutter: 'stable',
            maxHeight: `calc(100vh - 2.75rem)`,
          }}
          className={
            'sticky top-11 shrink-0 overflow-x-hidden overflow-y-auto hidden sm:flex border-l border-neutral-300/40 dark:border-neutral-800/40'
          }
        />
      </div>
      <footer
        className={
          'flex flex-col items-center min-w-full border-t border-neutral-300/40 dark:border-neutral-800/40'
        }
      >
        <div
          className={
            'flex flex-row justify-between container py-4 px-2 sm:px-4 lg:px-8 gap-2'
          }
        >
          <div className={'flex flex-col gap-4'}>
            <div
              className={'flex flex-row place-items-center gap-2 items-stretch'}
            >
              <Image
                src={'/vite.svg'}
                layout={'fixed'}
                height={20}
                width={20}
              />
              <p className={'text-lg font-bold'}>{name}</p>
            </div>
            <LinkButton href={`${repository}/blob/main/LICENSE`}>
              {license} License
            </LinkButton>
            <div className={'flex flex-row gap-2'}>
              <LinkButton hideExternalIcon href={repository}>
                <GitHub />
              </LinkButton>
              {/*<svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1"
              >
                <g>
                  <path
                    d="M19.5,4.5v15h-3v-12H12v12H4.5l0-15H19.5 M20.3,3.7h-0.8h-15H3.7l0,0.8l0,15l0,0.7h0.7H12h0.8v-0.8V8.2h3v11.3
		v0.8h0.8h3h0.8v-0.8v-15V3.7L20.3,3.7z"
                  />
                </g>
              </svg>*/}
            </div>
          </div>
          <div className={'flex flex-row gap-2'}>
            {groups.map((x) => (
              <p key={x} className={'font-semibold'}>
                {x.slice(0, 1).toUpperCase() + x.slice(1)}
              </p>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
