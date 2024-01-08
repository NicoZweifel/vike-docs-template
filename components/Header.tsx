import { usePageContext } from "../renderer/usePageContext";
import { DarkModeToggle } from "./DarkModeToggle";
import { ComponentProps } from "preact";
import { cn } from "../utils/cn";

export function Header({ className, ...props }: ComponentProps<"header">) {
  const {
    pageProps: { name },
  } = usePageContext();
  return (
    <header
      {...props}
      className={
        "fixed flex top-0 w-full backdrop-blur flex-none border-b grow justify-center z-10 "
      }
    >
      <nav
        className={"p-2 flex flex-row container items-stretch justify-between"}
      >
        <p className={"text-lg font-bold"}>{name}</p>
        <DarkModeToggle />
      </nav>
    </header>
  );
}
