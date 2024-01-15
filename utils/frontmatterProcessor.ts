import path from 'path';
import fs from 'fs';

export const frontmatterProcessor = (
  cwd: string,
  file: string,
  baseRoute: string,
  // eslint-disable-next-line
  frontmatter: Record<string, any>
) => {
  const absoluteCwd = path.join(process.cwd(), cwd);

  const filePath = path.join(absoluteCwd, file);
  file = file.replaceAll('\\', '/');
  const name = file.substring(0, file.lastIndexOf('.'));

  const fileName = name.split('/').slice(-1)[0];

  if (baseRoute === '/') baseRoute = '';

  frontmatter.cwd = cwd;
  frontmatter.title =
    frontmatter.title ?? fileName.charAt(0).toUpperCase() + fileName.slice(1);
  frontmatter.file = file;
  frontmatter.route = `${baseRoute}/${frontmatter.route && frontmatter.route.startsWith('/') ? frontmatter.route.slice(1) : frontmatter.route ?? `${name}`}`;
  frontmatter.path = `${frontmatter.route.split('/').slice(0, -1).join('/')}`;
  frontmatter.headings = [];
  frontmatter.lastEdited = fs.statSync(filePath).mtime.toDateString();

  const p = frontmatter.path.split('/').slice(-1)[0];

  if (frontmatter.route.endsWith('/index')) {
    frontmatter.route = frontmatter.route.slice(0, -6);
  }

  if (
    frontmatter.title.toLowerCase() === 'index' ||
    frontmatter.title.toLowerCase() === p.toLowerCase()
  ) {
    frontmatter.title = p.charAt(0).toUpperCase() + p.slice(1);
  }
};
