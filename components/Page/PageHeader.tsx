import { usePageContext } from '../../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';

export function PageHeader({
  className,
  ...props
}: Omit<ComponentProps<'header'>, 'children'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const path = frontmatter.path.replace('/', '').replaceAll('/', ' / ');
  const formatted = path.charAt(0).toUpperCase() + path.slice(1);
  return (
    <header {...props} className={cn('gap-1 flex flex-col', className)}>
      {formatted !== frontmatter.title && (
        <p
          className={
            'font-semibold text-xl  text-neutral-600 dark:text-neutral-400'
          }
        >
          {formatted}
        </p>
      )}
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
