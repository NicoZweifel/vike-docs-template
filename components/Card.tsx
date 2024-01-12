import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

export const Card = ({ className, children, ...p }: ComponentProps<'div'>) => {
  return (
    <div
      {...p}
      className={cn(
        'border bg-neutral-900/80 py-6 p-4 border-neutral-700/40 rounded overflow-hidden',
        className
      )}
    >
      {children}
    </div>
  );
};
