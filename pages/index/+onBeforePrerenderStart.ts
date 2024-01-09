import { getDocs } from '../../utils/getDocs';
import options from '../../options';

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const docs = await getDocs();
  const navItems = docs
    .filter((x) => x.frontmatter.hidden !== true)
    .map((x) => ({
      route: x.frontmatter.route,
      title: x.frontmatter.title,
      path: x.frontmatter.path,
      order: x.frontmatter.order,
    }));

  return [
    {
      url: '/',
      pageContext: {
        pageProps: {
          ...(docs.find(
            (x) => x.frontmatter.route === '/' || x.frontmatter.route === ''
          ) ?? docs[0]),
          navItems,
          name: options.name,
        },
      },
    },
    ...docs.map((x) => {
      const pageProps = {
        ...x,
        navItems,
        name: options.name,
      };

      return {
        url: x.frontmatter.route,
        pageContext: {
          pageProps,
        },
      };
    }),
  ];
}
