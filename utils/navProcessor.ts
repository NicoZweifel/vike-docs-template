import { createNavTree } from './createNavTree';

import { Frontmatter } from '../types/Frontmatter';
import { NavItem } from '../types';

export const navProcessor = (frontMatter: Frontmatter[]) => {
  const navItems = frontMatter
    .filter((x) => x.hidden !== true)
    .sort((a, b) => {
      const slugCountA = a.route.split('/').filter((x) => x.length > 0);
      const slugCountB = b.route.split('/').filter((x) => x.length > 0);

      const hasOrder = a.order || b.order;
      if (hasOrder) {
        return (
          Number(a.order ?? Number.MAX_SAFE_INTEGER) -
          Number(b.order ?? Number.MAX_SAFE_INTEGER)
        );
      }

      if (slugCountA.length !== slugCountB.length) {
        return slugCountA.length - slugCountB.length;
      }

      const isNotEqualLength = a.path.length !== b.path.length;

      if (isNotEqualLength && a.path.length === 0) return -1;
      if (isNotEqualLength && b.path.length === 0) return 1;

      return a.title.localeCompare(b.title);
    })
    .map((x) => ({
      route: x.route,
      title: x.title,
      path: x.path,
      order: x.order,
      file: x.file,
      cwd: x.cwd,
      lastEdited: x.lastEdited,
      hidden: x.hidden,
      headings: x.headings,
      description: x.description,
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

  return { navItems, navTree };
};
