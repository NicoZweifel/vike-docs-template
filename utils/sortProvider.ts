export const sortProvider = <T extends { frontmatter: Record<string, string> }>(
  pages: T[]
) => {
  return pages.sort((a, b) => {
    const slugCountA = a.frontmatter.route
      .split('/')
      .filter((x) => x.length > 0);
    const slugCountB = b.frontmatter.route
      .split('/')
      .filter((x) => x.length > 0);

    const hasOrder = a.frontmatter.order || b.frontmatter.order;
    if (hasOrder) {
      return (
        Number(a.frontmatter.order ?? Number.MAX_SAFE_INTEGER) -
        Number(b.frontmatter.order ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (slugCountA.length !== slugCountB.length) {
      return slugCountA.length - slugCountB.length;
    }

    return a.frontmatter.route.localeCompare(b.frontmatter.route);
  });
};
