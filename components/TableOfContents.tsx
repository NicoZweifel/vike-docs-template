import { usePageContext } from '../renderer/usePageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { sluggifyTitle } from '../utils/sluggifyTitle';

export function TableOfContents({
  className,
  ...props
}: ComponentProps<'nav'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const lowest = Math.min(...frontmatter.headings.map((x) => x.level));

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col', className)}>
      <p className={'font-bold text-neutral-900 dark:text-neutral-100'}>
        On this page
      </p>
      {frontmatter.headings.map((x) => (
        <a
          key={x.title}
          className={
            'whitespace-nowrap group py-0.5 items-center text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-300 dark:text-neutral-100 rounded-lg font-semibold'
          }
          style={{
            marginLeft: `${Math.max(
              0,
              Number(8 ?? 0) * Math.max(x.level - lowest + 1, 0)
            )}px`,
          }}
          href={`#${sluggifyTitle(x.title)}`}
        >
          {x.title}
        </a>
      ))}
    </nav>
  );
}
