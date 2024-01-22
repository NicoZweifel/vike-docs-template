import { createNavTree } from './createNavTree';

import { Frontmatter } from '../types/Frontmatter';
import { NavItem } from '../types';

export const navGenerator = (frontMatter: Frontmatter[]) => {
  const navItems = frontMatter
    .filter((x) => x.hidden !== true)
    .map(({ title, route, path, file, cwd, lastEdited }) => ({
      title,
      route,
      path,
      file,
      cwd,
      lastEdited,
    }));

  const groups = navItems.reduce((acc, x) => {
    if (acc.has(x.route)) {
      acc.get(x.route).push(x);
    } else {
      acc.set(x.route, [x]);
    }

    return acc;
  }, new Map<string, NavItem[]>());

  const navTree = createNavTree(groups);

  console.log(JSON.stringify(navTree, undefined, 2));

  return { navItems, navTree };
};
