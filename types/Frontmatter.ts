import { NavItem } from './NavItem';
import { DocHeading } from './DocHeading';

export type Frontmatter = NavItem & {
  headings: DocHeading[];
  hidden?: boolean;
  index?: boolean;
  descriptionCode?: string;
};
