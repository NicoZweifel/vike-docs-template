import path from 'path';
import fs from 'fs';
import { FrontmatterProcessor } from 'mdx-butler';
import { Frontmatter } from '../types/Frontmatter';
import { Options } from '../services';

export const frontmatterProcessor: FrontmatterProcessor<
  Frontmatter,
  Options & { route?: string }
> = ({ file, cwd, basePath, route, frontmatter }) => {
  const absoluteCwd = path.join(process.cwd(), cwd);

  const filePath = path.join(absoluteCwd, file);
  file = file.replaceAll('\\', '/');
  const name = file.substring(0, file.lastIndexOf('.'));

  const fileName = name.split('/').slice(-1)[0];

  if (basePath === '/') basePath = '';

  frontmatter.cwd = cwd;
  frontmatter.title =
    frontmatter.title ?? fileName.charAt(0).toUpperCase() + fileName.slice(1);
  frontmatter.file = file;
  frontmatter.route = `${basePath}/${frontmatter.route && frontmatter.route.startsWith('/') ? frontmatter.route.slice(1) : frontmatter.route ?? `${name}`}`;

  if ((frontmatter.route?.length ?? 0) === 0) frontmatter.route = '/';

  frontmatter.path = `${frontmatter.route.split('/').slice(0, -1).join('/')}`;

  if ((frontmatter.path?.length ?? 0) === 0) frontmatter.path = '/';

  frontmatter.lastEdited = fs.statSync(filePath).mtime.toDateString();

  const p = frontmatter.path.split('/').slice(-1)[0];

  if (frontmatter.route.endsWith('/index')) {
    frontmatter.index = true;
    frontmatter.route = frontmatter.route.slice(0, -6);
    if ((frontmatter.route?.length ?? 0) === 0) frontmatter.route = '/';
  }

  if (
    frontmatter.title.toLowerCase() === 'index' ||
    frontmatter.title.toLowerCase() === p.toLowerCase()
  ) {
    frontmatter.index = true;
    frontmatter.title = p.charAt(0).toUpperCase() + p.slice(1);
  }

  return (
    route == undefined ||
    route.toLowerCase() === frontmatter.route.toLowerCase() ||
    route.toLowerCase() === frontmatter.path.toLowerCase()
  );
};
