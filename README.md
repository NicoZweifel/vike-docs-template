# vike-docs-template

[![Docs](https://img.shields.io/badge/docs-online-green)](https://vike-docs-template.nicozweifel.com/)

A simple template to easily deploy [`MDX`](https://mdxjs.com/) files.

## Getting started

- Clone the repository or create a repository from the template.
- `pnpm i`
- `pnpm dev`

## Notes

- Author mdx files in a `docs` folder or with [any file pattern](/configuration#options).
- File and frontmatter based routing
- A Perfect lighthouse score.
- Easy [Deployment](https://vike-docs-template.nicozweifel.com/deploy/)
- 100% static output, resulting in a very easy and blazingly fast deployment to [`GitHub Pages`](https://pages.github.com/), [`Cloudflare Pages`](https://pages.cloudflare.com/), [`Vercel`](https://vercel.com/), [`AWS`](https://aws.amazon.com/) and many other hosting providers.
- Full support for custom components and snippets. Import anything in your documents, all files will be bundled in parallel with [`mdx-bundler`](https://github.com/kentcdodds/mdx-bundler) and [`esbuild`](https://esbuild.github.io/).
- Unopinionated styling. Adding [Global CSS](https://vike-docs-template.nicozweifel.com/customization/ui/styling#global-css), a custom [`tailwind`](https://vike-docs-template.nicozweifel.com/customization/ui/styling#tailwind) config or other [styling solutions](https://vike-docs-template.nicozweifel.com/customization/ui/styling) is encouraged.
- No bloat - just the basics with a focus on only adding light-weight dependencies.
- Easy to add analytics, search or other third party implementations.
- Uses [`vike`](https://vike.dev/) + [`preact`](https://preactjs.com/) and [`tailwind`](https://tailwindcss.com/) for a tiny bundle size.
- [`Unpic`](https://unpic.pics/) to handle Images.
- [`prettier`](https://prettier.io/) and [`eslint`](https://eslint.org/) configuration for automatic linting and formatting of files, including [`MDX`](https://mdxjs.com/) documents and Code blocks.

## Security Notice

MDX is javascript. If not carefully done, evaluating user content can expose to XSS attacks.

Always be careful if you are not evaluating your own content.
