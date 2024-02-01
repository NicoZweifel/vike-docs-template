import { ComponentProps, VNode } from 'preact';
import { AlertTriangle, Check, Info as InfoIcon, X } from 'react-feather';
import { cn } from '../utils/cn';

export const Card = ({
  children,
  variant,
  className,
  ...p
}: ComponentProps<'div'> & {
  variant?: 'success' | 'warning' | 'info' | 'error';
}) => {
  const size = children instanceof Array && children.length > 1 ? 34 : 22;
  let x: {
    className?: string;
    icon?: VNode;
  };
  switch (variant) {
    case 'success':
      x = {
        className:
          'text-green-800/90 dark:text-green-300/90 bg-green-300/10 border-green-500/10',
        icon: <Check size={size} />,
      };
      break;
    case 'warning':
      x = {
        className:
          'text-amber-500/90 dark:text-amber-300/80 bg-amber-300/10 border-amber-500/10',
        icon: <AlertTriangle size={size} />,
      };
      break;
    case 'info':
      x = {
        className:
          'text-blue-900/90 dark:text-blue-300/80 bg-blue-300/10 border-blue-500/10',
        icon: <InfoIcon size={size} />,
      };
      break;
    case 'error':
      x = {
        className:
          'text-red-700/90 dark:text-red-400/90 bg-red-300/10 border-red-500/10',
        icon: <X size={size} />,
      };
      break;
    default:
      x = {
        className:
          'bg-neutral-500/20 border-neutral-500/20 text-neutral-950/80 dark:text-neutral-100/40 ',
      };
      break;
  }
  return (
    <div
      {...p}
      className={cn(
        'flex flex-row gap-4 border px-4 py-4 my-2 rounded place-items-center',
        x.className,
        className
      )}
    >
      <div className={'inline-block'}>{x.icon}</div>
      <div className={'flex flex-col'}>{children}</div>
    </div>
  );
};
