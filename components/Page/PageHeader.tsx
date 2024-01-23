import { usePageContext } from '../../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';
import { getMDXComponent } from 'mdx-bundler/client';
import { LinkButton } from '../LinkButton';

export function PageHeader({
  className,
  ...props
}: Omit<ComponentProps<'header'>, 'children'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const path = frontmatter.path.split('/').filter((x) => x.length > 0);
  const Description =
    frontmatter.descriptionCode && getMDXComponent(frontmatter.descriptionCode);

  let basePath = '';

  return (
    <header {...props} className={cn('gap-1 flex flex-col', className)}>
      <div className={'flex flex-row gap-1'}>
        {path.map((x, i) => {
          basePath = `${basePath}/${x}`;
          return (
            <a key={x} href={basePath}>
              <p
                className={
                  'font-semibold text-xl text-neutral-600 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-300'
                }
              >
                {x.charAt(0).toUpperCase() +
                  x.slice(1) +
                  (i === path.length - 1 ? '' : ' / ')}
              </p>
            </a>
          );
        })}
      </div>
      <p className={'font-bold text-4xl'}>{frontmatter.title}</p>
      {frontmatter.descriptionCode && (
        <Description
          components={{
            a: (p) => <LinkButton {...p} />,
            p: ({ className, ...p }) => (
              <div
                {...p}
                className={cn(
                  'font-semibold text-lg text-neutral-700 dark:text-neutral-300',
                  className
                )}
              />
            ),
          }}
        />
      )}
    </header>
  );
}
