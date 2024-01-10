import './index.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

import { PageHeader, TableOfContents, SideBar, Header } from './components';
import { VNode } from 'preact';

export function Layout({ children }: { children: VNode }) {
  return (
    <div
      className={
        'min-h-screen min-w-full flex justify-center bg-white dark:bg-neutral-950 dark:text-white'
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
          className={'sticky top-11 shrink-0 overflow-y-auto hidden lg:flex'}
        />
        <div className={'px-2 py-4 flex shrink-1 flex-col grow gap-1'}>
          <PageHeader />
          <main className={'flex flex-col gap-2'}>{children}</main>
        </div>
        <TableOfContents
          style={{
            scrollbarGutter: 'stable',
            maxHeight: `calc(100vh - 2.75rem)`,
          }}
          className={
            'sticky top-11 shrink-0 overflow-x-hidden overflow-y-auto hidden sm:flex'
          }
        />
      </div>
    </div>
  );
}

export default Layout;
