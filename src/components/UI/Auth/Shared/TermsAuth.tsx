import { AuthFormType } from "../AuthModal";

export const TermsAuth = ({ type }: { type: AuthFormType }) => {
  const titleText =
    type === "register" ? `By registering an account` : `By signing in`;
  return (
    <p className="mt-9 text-xs text-zinc-500 dark:text-zinc-400">
      {titleText}, you agree to our{" "}
      <a href="#" className="text-sky-600 dark:text-sky-400">
        Terms & Conditions
      </a>{" "}
      and{" "}
      <a href="#" className="text-sky-600 dark:text-sky-400">
        Privacy Policy.
      </a>
    </p>
  );
};
