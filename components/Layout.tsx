import '../index.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

import { VNode } from 'preact';
import { Header, PageLayout, SideBar, TableOfContents, Footer } from './index';

export function Layout({ children }: { children: VNode }) {
  return (
    <div
      className={
        'min-h-screen min-w-full flex flex-col items-center justify-between bg-white dark:bg-neutral-950 dark:text-white'
      }
    >
      <Header />
      <div
        className={
          'flex flex-row grow container items-stretch pt-11 sm:px-2 lg:px-4 sm:gap-4 lg:gap-8'
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
        <PageLayout>{children}</PageLayout>
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
      <Footer />
    </div>
  );
}

export default Layout;
