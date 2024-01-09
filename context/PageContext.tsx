// `usePageContext` allows us to access `pageContext` in any React component.
// See https://vike.dev/pageContext-anywhere

import { ComponentChildren, createContext } from 'preact';
import { useContext } from 'preact/hooks';

import type { PageContext } from 'vike/types';

export { PageContextProvider, usePageContext };

const Context = createContext<PageContext>(undefined as unknown as PageContext);

function PageContextProvider({
  pageContext,
  children,
}: {
  pageContext: PageContext;
  children: ComponentChildren;
}) {
  return <Context.Provider value={pageContext}>{children}</Context.Provider>;
}

function usePageContext() {
  return useContext(Context);
}
