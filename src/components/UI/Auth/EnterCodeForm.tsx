import SecureEncryptButton from "../Buttons/SecureEncryptButton";
import { SetFormTypeProps } from "./AuthModal";
import { CodeInput6Digits } from "./Shared/CodeInput6Digits";
import { HeadingAuth } from "./Shared/HeadingAuth";

export const EnterCodeForm = ({ setFormType }: SetFormTypeProps) => {
  return (
    <>
      <HeadingAuth type="entercode" setFormType={setFormType} />
      <EnterCode />
    </>
  );
};

const EnterCode = () => {
  const handleCodeChange = (value: string) => {
    console.log("Code entered:", value);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-3">
        <label
          htmlFor="code-input"
          className="mb-1.5 block text-zinc-600 dark:text-zinc-400">
          Enter the code sent to your email
        </label>
        <div className="flex justify-center">
          <CodeInput6Digits onCodeChange={handleCodeChange} />
        </div>
      </div>

      <SecureEncryptButton colorStyle="green" btnText="Verify Code" />
    </form>
  );
};
