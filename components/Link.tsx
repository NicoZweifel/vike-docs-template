import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';

export function Link(props: ComponentProps<'a'>) {
  const pageContext = usePageContext();
  const className = [
    props.className,
    pageContext.urlPathname === props.href && 'is-active',
  ]
    .filter(Boolean)
    .join(' ');

  return <a {...props} className={className} />;
}
