import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';

export function Link(props: ComponentProps<'a'>) {
  const { urlPathname } = usePageContext();
  const className = [props.className, urlPathname === props.href && 'is-active']
    .filter(Boolean)
    .join(' ');

  return <a {...props} className={className} />;
}
