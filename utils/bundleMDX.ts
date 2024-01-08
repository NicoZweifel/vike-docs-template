import { bundleMDX as _bundleMDX } from "mdx-bundler";
import { glob } from "glob";
import path from "path";
import { tocPlugin } from "./tocPlugin";

export type MDXBundlerOptions = Omit<
  Parameters<typeof _bundleMDX>[0],
  "file" | "cwd" | "source" | "mdxOptions"
> & { mdxOptions?: MDXOptions };
export type MDXOptions = Parameters<
  Parameters<typeof _bundleMDX>[0]["mdxOptions"]
>[0];

export type BundleMDXOptions = {
  name: string;
  pattern: string;
  cwd: string;
  toc: boolean;
  mdxBundlerOptions: MDXBundlerOptions;
};

async function bundleMDX({
  pattern,
  cwd,
  mdxBundlerOptions,
  toc,
}: BundleMDXOptions): Promise<Awaited<ReturnType<typeof _bundleMDX>>[]> {
  cwd = path.join(process.cwd(), cwd);

  const files = await glob(pattern, { ignore: "node_modules/**", cwd });
  const res: ReturnType<typeof _bundleMDX>[] = [];

  for (let file of files) {
    res.push(
      _bundleMDX({
        ...mdxBundlerOptions,
        file: path.join(cwd, file),
        cwd,
        mdxOptions: (options, frontmatter) => {
          file = file.replaceAll("\\", "/");
          const name = file.substring(0, file.lastIndexOf("."));

          frontmatter.title = frontmatter.title ?? name;
          frontmatter.file = file;
          frontmatter.route = frontmatter.route ?? `/${name}`;
          frontmatter.path = `${frontmatter.route
            .split("/")
            .slice(0, -1)
            .join("/")}`;
          frontmatter.headings = [];

          // this is the recommended way to add custom remark/rehype plugins:
          // The syntax might look weird, but it protects you in case we add/remove
          // plugins in the future.
          options.remarkPlugins = [
            toc ? tocPlugin(frontmatter.headings) : [],
            ...(options.remarkPlugins ?? []),
            ...(mdxBundlerOptions.mdxOptions.remarkPlugins ?? []),
          ];
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            ...(mdxBundlerOptions.mdxOptions.rehypePlugins ?? []),
          ];

          return {
            ...options,
            ...mdxBundlerOptions.mdxOptions,
            remarkPlugins: options.remarkPlugins,
            rehypePlugins: options.rehypePlugins,
          };
        },
      }),
    );
  }

  return Promise.all(res);
}

export default bundleMDX;
