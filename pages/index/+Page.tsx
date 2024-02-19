import { usePageContext } from '../../context/PageContext';
import mdxComponents from '../../components/mdxComponents';
import { PageLayout } from '../../components';
import { Page as ErrorPage } from '../_error/+Page';
import { getMDXComponent } from 'mdx-bundler/client';

export { Page };

function Page() {
  const { pageProps } = usePageContext();
  const { code } = pageProps;
  if (code == undefined || code.length === 0)
    return (
      <div className={'pt-20'}>
        <ErrorPage is404={true} />
      </div>
    );

  const Component = getMDXComponent(code);

  return (
    <PageLayout>
      <Component components={mdxComponents} />
    </PageLayout>
  );
}
