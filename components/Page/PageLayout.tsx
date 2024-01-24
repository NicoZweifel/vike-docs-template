import { PageHeader } from './PageHeader';
import { PageFooter } from './PageFooter';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';
import { SideBar } from '../SideBar';
import { TableOfContents } from '../TableOfContents';

export const PageLayout = ({
  children,
  className,
  ...props
}: ComponentProps<'article'>) => {
  return (
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
        className={'sticky top-11 shrink-0 overflow-y-auto hidden lg:flex'}
      />
      <article
        {...props}
        className={cn('px-2 py-4 flex shrink-1 flex-col grow gap-4', className)}
      >
        <PageHeader />
        <main className={'flex flex-col gap-2'}>{children}</main>
        <PageFooter />
      </article>
      <TableOfContents
        style={{
          scrollbarGutter: 'stable',
          maxHeight: `calc(100vh - 2.75rem)`,
        }}
        className={`sticky top-11 shrink-0 overflow-x-hidden overflow-y-auto hidden sm:flex`}
      />
    </div>
  );
};
