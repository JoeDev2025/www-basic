import clsx from "clsx";

export const GhostButton = ({
  children,
  className,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  rest?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}) => {
  return (
    <button
      className={clsx(
        "rounded-md px-4 py-2  transition-all hover:scale-[1.02] hover:bg-zinc-800 hover:text-zinc-50 active:scale-[0.98]",
        "text-zinc-800 dark:text-zinc-100",
        className
      )}
      {...rest}>
      {children}
    </button>
  );
};
