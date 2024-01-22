import { ComponentProps } from 'preact';
import { Card } from './Card';

type ActionCardProps = Omit<ComponentProps<typeof Card>, 'variant'>;

export const Success = (p: ActionCardProps) => (
  <Card {...p} variant={'success'} />
);
export const Warning = (p: ActionCardProps) => (
  <Card {...p} variant={'warning'} />
);
export const Info = (p: ActionCardProps) => <Card {...p} variant={'info'} />;
export const Error = (p: ActionCardProps) => <Card {...p} variant={'error'} />;

export const customComponents = {
  Success,
  Warning,
  Info,
  Error,
};
