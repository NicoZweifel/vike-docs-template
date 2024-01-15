import { usePageContext } from '../../context/PageContext';
import { getMDXComponent } from 'mdx-bundler/client';
import mdxComponents from '../../components/mdxComponents';
import { PageLayout } from '../../components';
import { Page as ErrorPage } from '../_error/+Page';

export { Page };

function Page() {
  const {
    pageProps: { code },
  } = usePageContext();
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
