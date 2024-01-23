import { usePageContext } from '../../context/PageContext';
import { LinkButton } from '../LinkButton';
import { ChevronLeft, ChevronRight, GitHub } from 'react-feather';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';
import { Card } from '../Card';

export const PageFooter = ({
  className,
  ...props
}: Omit<ComponentProps<'footer'>, 'children'>) => {
  const {
    pageProps: { repository, frontmatter },
  } = usePageContext();

  return (
    <footer
      {...props}
      className={cn(
        'border-t gap-8 flex flex-col mt-10 py-12 border-neutral-300/40 dark:border-neutral-800/40',
        className
      )}
    >
      <div className={'flex flex-row grow justify-evenly gap-4'}>
        <Card
          className={
            'grow cursor-pointer hover:bg-neutral-400/10 hover:border-neutral-400/10'
          }
        >
          <ChevronLeft />
          Next
        </Card>
        <Card
          className={
            'grow cursor-pointer flex flex-row gap-2 justify-end hover:bg-neutral-400/10 hover:border-neutral-400/10'
          }
        >
          Previous
          <ChevronRight />
        </Card>
      </div>
      <div className={'flex flex-row justify-between'}>
        <div className={'text-sm'}>
          <p className={'pl-1'}>Was this article helpful to you?</p>
          <LinkButton
            aria-label={'Submit issue button'}
            hideExternalIcon
            href={`${repository}/issues`}
            className={'flex flex-row gap-1 items-center'}
          >
            <GitHub size={14} /> Submit issue
          </LinkButton>
        </div>
        <div className={'text-sm'}>
          <p className={'pl-1'}>Last edited on {frontmatter.lastEdited}</p>
          <LinkButton
            aria-label={'Edit Page button'}
            hideExternalIcon
            href={`${repository}/blob/main${frontmatter.cwd}/${frontmatter.file}`}
            className={'flex flex-row gap-1 items-center'}
          >
            <GitHub size={14} /> Edit page
          </LinkButton>
        </div>
      </div>
    </footer>
  );
};
