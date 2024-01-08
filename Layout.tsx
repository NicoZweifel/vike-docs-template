import './index.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

import { PageHeader } from './components';
import { VNode } from 'preact';
import { TableOfContents } from './components/TableOfContents';
import { SideBar } from './components/SideBar';
import { Header } from './components/Header';

export function Layout({ children }: { children: VNode }) {
  return (
    <div
      className={
        'min-h-screen min-w-full flex justify-center bg-white dark:bg-neutral-950 dark:text-white'
      }
    >
      <Header />
      <div className={'flex flex-row container items-stretch gap-12 pt-10'}>
        <div className={'relative'}>
          <SideBar className={'hidden lg:flex sticky top-10'} />
        </div>
        <div className={'px-2 py-4 flex flex-col grow'}>
          <PageHeader />
          <main>{children}</main>
        </div>
        <div className={'relative'}>
          <TableOfContents className={'hidden sm:flex grow sticky top-10'} />
        </div>
      </div>
    </div>
  );
}

export default Layout;
