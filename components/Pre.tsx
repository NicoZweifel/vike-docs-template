import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'preact/hooks';
import { copyToClipboard } from '../utils/copyToClipboard';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';
import { CheckSquare, Clipboard } from 'react-feather';

const usePre = () => {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleClickCopy = useCallback(async () => {
    if (!preRef.current?.innerText) return;
    await copyToClipboard(preRef.current.innerText);
    setCopied(true);
  }, []);

  return useMemo(
    () => ({
      preRef,
      copied,
      handleClickCopy,
    }),
    [copied, handleClickCopy]
  );
};

export function Pre({ className, children, ...props }: ComponentProps<'pre'>) {
  const { preRef, copied, handleClickCopy } = usePre();
  return (
    <pre
      {...props}
      className={cn(
        'my-1 max-w-[calc(100vw-1em)] overflow-x-auto relative group rounded border border-neutral-800/5',
        className
      )}
      ref={preRef}
    >
      <button
        type="button"
        disabled={copied}
        onClick={handleClickCopy}
        aria-label="Copy to Clipboard"
        className={`${
          copied
            ? 'text-green-300/40 shadow shadow-green-300/5 border-green-300/15 bg-green-700/10'
            : 'bg-neutral-900/40 text-neutral-500/60 border-neutral-700/80 hover:shadow hover:shadow-neutral-400/5 hover:bg-neutral-900/80 hover:text-neutral-400/80 hover:border-neutral-400/40 hidden'
        } z-10 absolute border rounded p-1 group-hover:flex top-0 right-0 my-2.5 mr-2.5`}
      >
        {copied ? <CheckSquare size={16} /> : <Clipboard size={16} />}
      </button>
      {children}
    </pre>
  );
}
