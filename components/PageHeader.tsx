import { usePageContext } from '../renderer/usePageContext';
import { H } from './H';
import { ComponentProps } from 'preact';

export function PageHeader(props: ComponentProps<'div'>) {
  const {
    pageProps: { frontmatter },
  } = usePageContext();
  return (
    <div {...props}>
      <H className={'text-gray-800 dark:text-gray-200'} level={5}>
        {frontmatter.path.replaceAll('/', ' / ')}
      </H>
      <H level={1}>{frontmatter.title}</H>
      <H level={2}>{frontmatter.description}</H>
    </div>
  );
}
