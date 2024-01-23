import { ComponentProps, VNode } from 'preact';
import {
  AlertTriangle,
  CheckSquare,
  Info as InfoIcon,
  XCircle,
} from 'react-feather';
import { cn } from '../utils/cn';

export const Card = ({
  children,
  variant,
  className,
  ...p
}: ComponentProps<'div'> & {
  variant?: 'success' | 'warning' | 'info' | 'error';
}) => {
  const size = 24;
  let x: {
    className?: string;
    icon?: VNode;
  };
  switch (variant) {
    case 'success':
      x = {
        className: 'bg-green-300/10 border-green-500/10',
        icon: <CheckSquare size={size} />,
      };
      break;
    case 'warning':
      x = {
        className: 'bg-amber-300/10 border-amber-500/10',
        icon: <AlertTriangle size={size} />,
      };
      break;
    case 'info':
      x = {
        className: 'bg-blue-300/10 border-blue-500/10',
        icon: <InfoIcon size={size} />,
      };
      break;
    case 'error':
      x = {
        className: 'bg-red-300/10 border-red-500/10',
        icon: <XCircle size={size} />,
      };
      break;
    default:
      x = {
        className: 'bg-neutral-500/20 border-neutral-500/20',
      };
      break;
  }
  return (
    <div
      {...p}
      className={cn(
        'flex flex-row gap-4 border px-4 py-4 rounded place-items-center text-neutral-900/90 dark:text-neutral-400/90',
        x.className,
        className
      )}
    >
      <div className={'inline-block'}>{x.icon}</div>
      {children}
    </div>
  );
};
