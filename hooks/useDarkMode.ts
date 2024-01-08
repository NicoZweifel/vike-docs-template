import { useEffect, useState } from 'preact/hooks';
import { SetStateAction } from 'preact/compat';

export type ThemeMode = 'dark' | 'light';

export type ThemeState = { mode: ThemeMode };

export function useDarkMode(): [ThemeState, SetStateAction<ThemeState>] {
  const root =
    typeof window !== 'undefined'
      ? window.document?.documentElement
      : undefined;

  const state = useState<ThemeState>({
    mode: root?.classList?.contains('dark') ? 'dark' : 'light',
  });

  const [{ mode }] = state;

  useEffect(() => {
    const currentTheme = mode === 'light' ? 'dark' : 'light';

    console.debug('color-theme:', mode);

    root.classList.remove(currentTheme);
    root.classList.add(mode === 'light' ? 'light' : 'dark');

    if (typeof window !== 'undefined') {
      localStorage.setItem('color-theme', mode);
    }
  }, [mode, root]);

  return state;
}
