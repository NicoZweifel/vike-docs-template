import { usePageContext } from '../context/PageContext';
import { ComponentProps } from 'preact';
import { cn } from '../utils/cn';

interface TreeNode {
  name: string;
  children: TreeNode[];
}

function createNode(path: string[], tree: TreeNode[]): void {
  const name = path.shift();
  const idx = tree.findIndex((e: TreeNode) => e.name == name);

  if (idx < 0) {
    tree.push({
      name: name,
      children: [],
    });
    if (path.length !== 0) {
      createNode(path, tree[tree.length - 1].children);
    }
  } else {
    createNode(path, tree[idx].children);
  }
}

function createTree(data: string[]): TreeNode[] {
  const tree: TreeNode[] = [];

  for (let i = 0; i < data.length; i++) {
    const path: string = data[i];
    const split: string[] = path.split('/');

    createNode(split, tree);
  }
  return tree;
}

const Node = ({
  node,
  path,
  className,
  ...props
}: { node: TreeNode; path: string } & Omit<
  ComponentProps<'div'>,
  'children'
>) => {
  const {
    pageProps: { navItems },
  } = usePageContext();
  const { name, children } = node;
  let fullPath = [path, name].join('/').replaceAll('//', '/');
  if (fullPath === '/') fullPath = '';
  return (
    <div {...props} className={cn('flex flex-col gap-1', className)}>
      {name.length > 1 && (
        <p
          className={
            'text-sm font-bold text-neutral-900 dark:text-neutral-100 text-start py-1 pl-2'
          }
        >
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      )}
      <div
        className={cn(
          name.length > 0
            ? 'ml-1 pl-2 border-l border-neutral-300/60 dark:border-neutral-800/40'
            : undefined,
          'flex flex-col gap-2'
        )}
      >
        <div className={'flex flex-col gap-0'}>
          {navItems
            .filter((y) => y.path === fullPath)
            .sort((a, b) =>
              a.order || b.order
                ? Number(a.order ?? Number.MAX_SAFE_INTEGER) -
                  Number(b.order ?? -Number.MAX_SAFE_INTEGER)
                : a.title.localeCompare(b.title)
            )
            .map(({ title, route }) => (
              <a
                key={route}
                className={
                  'whitespace-nowrap text-sm py-1 px-2 flex items-center hover:bg-neutral-200/80 dark:hover:bg-neutral-800/60 rounded text-neutral-600 hover:text-neutral-900 dark:text-neutral-100 dark:hover:text-neutral-300 font-semibold'
                }
                href={route}
              >
                {title}
              </a>
            ))}
        </div>
        {children.map((x) => (
          <Node key={x.name} node={x} path={fullPath} />
        ))}
      </div>
    </div>
  );
};

export function SideBar({ className, ...props }: ComponentProps<'nav'>) {
  const {
    pageProps: { navItems },
  } = usePageContext();

  const groups = new Set(navItems.map((x) => x.path).sort());

  const nodes = createTree([...groups]);

  return (
    <nav {...props} className={cn('flex px-2 py-4 flex-col', className)}>
      {nodes.map((x) => (
        <Node key={x.name} node={x} path={''} />
      ))}
    </nav>
  );
}
