import { getMDXComponent } from 'mdx-bundler/client';
import { usePageContext } from '../../context/PageContext';
import mdxComponents from '../../mdxComponents';

export function Page() {
  const {
    pageProps: { code },
  } = usePageContext();
  const Component = getMDXComponent(code);
  return <Component components={mdxComponents} />;
}
