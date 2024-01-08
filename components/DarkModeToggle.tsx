import { ComponentProps } from "preact";
import { cn } from "../utils/cn";

export const DarkModeToggle = ({
  className,
  ...props
}: ComponentProps<"label">) => (
  <label
    {...props}
    className={cn(
      "relative inline-flex items-center justify-center cursor-pointer flex-col",
      className,
    )}
  >
    <input
      aria-label="dark mode toggle"
      role="switch"
      type="checkbox"
      value=""
      className="sr-only peer"
    />
    <div class="w-9 h-5 bg-gray-300 peer-focus:outline-none peer-checked:bg-gray-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[6px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all "></div>
  </label>
);
