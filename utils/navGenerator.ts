import { createNavTree } from './createNavTree';

import { Frontmatter } from '../types/Frontmatter';
import { NavItem } from '../types';

export const navGenerator = (frontMatter: Frontmatter[]) => {
  const navItems = frontMatter.filter((x) => x.hidden !== true);

  const groups = navItems.reduce((acc, x) => {
    if (acc.has(x.route)) {
      acc.get(x.route).push(x);
    } else {
      acc.set(x.route, [x]);
    }

    return acc;
  }, new Map<string, NavItem[]>());

  const navTree = createNavTree(groups);

  return { navItems, navTree };
};
