import { getDocs } from "../../utils/getDocs";
import options from "../../options";

export { onBeforePrerenderStart };

async function onBeforePrerenderStart() {
  const docs = await getDocs();
  const navItems = docs
    .filter((x) => x.frontmatter.hidden !== true)
    .map((x) => ({
      route: x.frontmatter.route,
      title: x.frontmatter.title,
      path: x.frontmatter.path,
    }));

  return docs.map((x) => {
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
  });
}
