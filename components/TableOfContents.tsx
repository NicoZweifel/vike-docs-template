import { usePageContext } from '../renderer/usePageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { sluggifyTitle } from '../utils/sluggifyTitle';
import { ChevronRight, List } from 'react-feather';

export function TableOfContents({
  className,
  ...props
}: ComponentProps<'nav'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  const lowest = Math.min(...frontmatter.headings.map((x) => x.level));

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col gap-1', className)}>
      <div className={'flex flex-row items-center gap-1'}>
        <List size={16} />
        <p className={'font-bold text-neutral-900 dark:text-neutral-100'}>
          On this page
        </p>
      </div>
      {frontmatter.headings.map((x) => (
        <a
          key={x.title}
          className={
            'whitespace-nowrap flex flex-row gap-1 group py-0.5 items-center text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-300 dark:text-neutral-100 rounded-lg'
          }
          style={{
            marginLeft: `${Math.max(0, 13 * Math.max(x.level - lowest, 0))}px`,
          }}
          href={`#${sluggifyTitle(x.title)}`}
        >
          <ChevronRight size={12} />
          <p className={'font-semibold text-sm'}>{x.title}</p>
        </a>
      ))}
    </nav>
  );
}
