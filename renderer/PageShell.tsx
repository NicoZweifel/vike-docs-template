import { PageContextProvider } from '../context/PageContext';
import Layout from '../components/Layout';

export { PageShell };

function PageShell({ pageContext, children }) {
  return (
    <PageContextProvider pageContext={pageContext}>
      <Layout children={children} />
    </PageContextProvider>
  );
}
