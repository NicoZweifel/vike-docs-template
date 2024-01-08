import { usePageContext } from "../renderer/usePageContext";
import { ComponentProps } from "preact";
import { cn } from "../utils/cn";

export function TableOfContents({
  className,
  ...props
}: ComponentProps<"nav">) {
  const {
    pageProps: { frontmatter },
    urlPathname,
  } = usePageContext();
  const lowest = Math.min(...frontmatter.headings.map((x) => x.level));

  return (
    <nav {...props} className={cn("flex px-2 py-4 flex-col", className)}>
      <p className={"font-bold text-gray-900 dark:text-gray-100"}>
        On this page
      </p>
      {frontmatter.headings.map((x) => (
        <a
          className={
            "whitespace-nowrap group py-0.5 items-center text-gray-600 hover:text-gray-900 dark:hover:text-gray-300 dark:text-gray-100 rounded-lg font-semibold"
          }
          style={{
            marginLeft: `${Math.max(
              0,
              Number(8 ?? 0) * Math.max(x.level - lowest + 1, 0),
            )}px`,
          }}
          href={`#${x.title.toLowerCase()}`}
        >
          {x.title}
        </a>
      ))}
    </nav>
  );
}
