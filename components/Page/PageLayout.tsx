import { PageHeader } from './PageHeader';
import { PageFooter } from './PageFooter';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';

export const PageLayout = ({
  children,
  className,
  ...props
}: ComponentProps<'article'>) => {
  return (
    <article
      {...props}
      className={cn('px-2 py-4 flex shrink-1 flex-col grow gap-1', className)}
    >
      <PageHeader />
      <main className={'flex flex-col gap-2'}>{children}</main>
      <PageFooter />
    </article>
  );
};
