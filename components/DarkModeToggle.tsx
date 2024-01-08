import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { useDarkMode } from '../hooks/useDarkMode';
import { useRef } from 'react';
import { useEffect } from 'preact/hooks';

export const DarkModeToggle = ({
  className,
  ...props
}: ComponentProps<'label'>) => {
  const [theme, setTheme] = useDarkMode();

  const ref = useRef<HTMLInputElement>();

  useEffect(() => {
    if (!ref.current.checked && theme.mode === 'dark') {
      ref.current.checked = true;
    }
  }, [ref, theme]);

  return (
    <label
      {...props}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer flex-col',
        className
      )}
    >
      <input
        ref={ref}
        aria-label="dark mode toggle"
        role="switch"
        type="checkbox"
        checked={theme.mode === 'dark'}
        className="sr-only peer"
        onClick={() => {
          setTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' });
        }}
      />
      <div
        className={`w-9 h-5 bg-neutral-300 peer-focus:outline-none peer-checked:bg-neutral-800 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:start-[2px] after:bg-neutral-100 after:rounded-full after:h-4 after:w-4 after:transition-all `}
      />
    </label>
  );
};
