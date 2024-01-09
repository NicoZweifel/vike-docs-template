import { usePageContext } from '../renderer/usePageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export function PageHeader({ className, ...props }: ComponentProps<'header'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const formatted = frontmatter.path.replace('/', '').replaceAll('/', ' / ');
  return (
    <header {...props} className={cn('gap-1 flex flex-col', className)}>
      <p
        className={
          'font-semibold text-xl  text-neutral-600 dark:text-neutral-400'
        }
      >
        {formatted.charAt(0).toUpperCase() + formatted.slice(1)}
      </p>
      <p className={'font-bold text-4xl'}>{frontmatter.title}</p>
      <p
        className={
          'font-semibold text-lg text-neutral-700 dark:text-neutral-300'
        }
      >
        {frontmatter.description}
      </p>
    </header>
  );
}
