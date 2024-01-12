import { NavItem } from './NavItem';

export type NavTreeNode = {
  name: string;
  children: NavTreeNode[];
  navItems: NavItem[];
  path: string;
};
