import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { useDarkMode } from '../hooks/useDarkMode';

export const DarkModeToggle = ({
  className,
  ...props
}: ComponentProps<'label'>) => {
  const [theme, setTheme] = useDarkMode();

  return (
    <label
      {...props}
      className={cn(
        'relative inline-flex items-center justify-center cursor-pointer flex-col',
        className
      )}
    >
      <input
        aria-label="dark mode toggle"
        role="switch"
        type="checkbox"
        className="sr-only peer"
        onClick={() => {
          setTheme({ mode: theme.mode === 'dark' ? 'light' : 'dark' });
        }}
      />
      <div
        className={`w-9 h-5 bg-neutral-300 dark:bg-neutral-800 peer-focus:outline-none rounded-full dark:after:translate-x-full rtl:dark:after:-translate-x-full after:content-[''] after:absolute after:top-[6px] after:start-[2px] after:bg-neutral-100 after:rounded-full after:h-4 after:w-4 after:transition-all `}
      />
    </label>
  );
};
