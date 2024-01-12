import { usePageContext } from '../../context/PageContext';
import { getMDXComponent } from 'mdx-bundler/client';
import mdxComponents from '../../components/mdxComponents';

export { Page };

function Page() {
  const {
    pageProps: { code },
  } = usePageContext();
  const Component = getMDXComponent(code);
  return <Component components={mdxComponents} />;
}
