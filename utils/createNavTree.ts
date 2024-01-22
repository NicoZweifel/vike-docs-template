import { NavTreeNode } from '../types/NavTreeNode';
import { NavItem } from '../types';

function createNode(
  path: string[],
  tree: NavTreeNode[],
  nav: NavItem[],
  basePath: string
): void {
  const name = path.shift();
  const fullPath = [basePath, name].join('/').replaceAll('//', '/');

  const navItems = nav.filter(
    (y) => y.path === fullPath && y.title.toLowerCase() !== name.toLowerCase()
  );

  navItems.forEach((x) => nav.splice(nav.indexOf(x), 1));

  const idx = tree.findIndex((e: NavTreeNode) => e.name == name);

  if (idx < 0) {
    tree.push({
      name,
      children: [],
      navItems,
      path: fullPath,
    });

    if (path.length !== 0) {
      createNode(path, tree[tree.length - 1].children, nav, fullPath);
    }
  } else {
    createNode(path, tree[idx].children, nav, fullPath);
  }
}

export function createNavTree(navItems: Map<string, NavItem[]>): NavTreeNode[] {
  const tree: NavTreeNode[] = [];
  const data = [...navItems.keys()];

  for (let i = 0; i < data.length; i++) {
    const path: string = data[i];
    const split: string[] = path.split('/');

    createNode(split, tree, [...navItems.values()].flat(), '/');
  }

  return tree;
}
