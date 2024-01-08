import { getMDXComponent } from 'mdx-bundler/client';
import { usePageContext } from '../../renderer/usePageContext';
import mdxComponents from '../../mdxComponents';

export function Page() {
  const {
    pageProps: { code },
  } = usePageContext();
  const Component = getMDXComponent(code);
  return (
    <div>
      <Component components={mdxComponents} />
    </div>
  );
}
