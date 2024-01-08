// https://vike.dev/onRenderClient
export { onRenderClient };
import '../index.css';

import { hydrate } from 'preact';
import { PageShell } from './PageShell';
import type { OnRenderClientAsync } from 'vike/types';

// This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
// to support SPA
const onRenderClient: OnRenderClientAsync = async (
  pageContext
): ReturnType<OnRenderClientAsync> => {
  const { Page, pageProps } = pageContext;
  if (!Page)
    throw new Error(
      'Client-side render() hook expects pageContext.Page to be defined'
    );
  const root = document.getElementById('app');
  if (!root) throw new Error('DOM element #app not found');

  hydrate(
    <PageShell pageContext={pageContext}>
      <Page {...pageProps} />
    </PageShell>,
    root
  );
};
