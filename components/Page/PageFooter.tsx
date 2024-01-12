import { usePageContext } from '../../context/PageContext';
import { LinkButton } from '../LinkButton';
import { GitHub } from 'react-feather';
import { ComponentProps } from 'preact';
import { cn } from '../../utils/cn';

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
        'border-t gap-8 flex flex-col mt-10 pb-10 pt-10 border-neutral-300/40 dark:border-neutral-800/40',
        className
      )}
    >
      <div className={'flex flex-row justify-between'}>
        <div className={'text-sm'}>
          <p className={'pl-1'}>Was this article helpful to you?</p>
          <LinkButton
            hideExternalIcon
            href={`${repository}/issues`}
            className={'flex flex-row gap-1 items-center'}
          >
            <GitHub size={14} /> Submit issue
          </LinkButton>
        </div>
        <div className={'text-sm'}>
          <p className={'pl-1'}>Last edited: {frontmatter.lastEdited}</p>
          <LinkButton
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
