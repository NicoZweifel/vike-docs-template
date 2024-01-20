import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { sluggifyTitle } from '../utils/sluggifyTitle';
import { ChevronRight, List } from 'react-feather';
import { getMDXComponent } from 'mdx-bundler/client';
import { LinkButton } from './LinkButton';

export function TableOfContents({
  className,
  ...props
}: ComponentProps<'nav'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const lowest = Math.min(...frontmatter.headings.map((x) => x.level));
  const components = frontmatter.headings.map((x) => ({
    ...x,
    Component: getMDXComponent(x.content),
  }));

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col gap-1', className)}>
      {components.length > 0 && (
        <div className={'flex flex-row items-center gap-1'}>
          <List size={16} />
          <p
            className={
              'font-bold shrink-0 text-neutral-900 dark:text-neutral-100'
            }
          >
            On this page
          </p>
        </div>
      )}
      {components.map(({ title, Component, level }) => (
        <a
          key={title}
          className={
            'whitespace-nowrap flex flex-row gap-1 group py-0.5 items-center text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-300 dark:text-neutral-100 rounded-lg'
          }
          style={{
            marginLeft: `${Math.max(0, 13 * Math.max(level - lowest, 0))}px`,
          }}
          href={`#${sluggifyTitle(title)}`}
        >
          <ChevronRight size={12} />
          <Component
            components={{
              a: (p) => <LinkButton {...p} />,
              p: (p) => (
                <p
                  {...p}
                  className={cn('font-semibold text-sm', p.className)}
                />
              ),
            }}
          />
        </a>
      ))}
    </nav>
  );
}
