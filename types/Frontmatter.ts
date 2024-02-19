import { NavItem } from './NavItem';

export type Frontmatter = NavItem & {
  hidden?: boolean;
  index?: boolean;
  hideLayout?: boolean;
  descriptionCode?: string;
  route: string;
};
