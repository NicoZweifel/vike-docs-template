import '../index.css';
import 'prism-themes/themes/prism-vsc-dark-plus.css';

import { VNode } from 'preact';
import { Header, Footer } from './index';

export function Layout({ children }: { children: VNode }) {
  return (
    <div
      className={
        'text-black dark:text-white min-h-screen min-w-full flex flex-col items-center justify-between bg-white dark:bg-neutral-950'
      }
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
