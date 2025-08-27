import SecureEncryptButton from "../Buttons/SecureEncryptButton";
import { SetFormTypeProps } from "./AuthModal";
import { HeadingAuth } from "./Shared/HeadingAuth";

export const ForgotPasswordForm = ({ setFormType }: SetFormTypeProps) => {
  return (
    <>
      <HeadingAuth type="forgotpassword" setFormType={setFormType} />
      <Email />
    </>
  );
};

const Email = () => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <label
          htmlFor="email-input"
          className="mb-1.5 block text-zinc-600 dark:text-zinc-400">
          Email
        </label>
        <input
          id="email-input"
          type="email"
          placeholder="your.email@provider.com"
          className="w-full rounded-md border border-zinc-400 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0 focus:ring-blue-700"
        />
      </div>

      <SecureEncryptButton colorStyle="orange" btnText="Send me a reset code" />
    </form>
  );
};
