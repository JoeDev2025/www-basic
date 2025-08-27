import { AuthFormType } from "../AuthModal";

type HeadingAuthProps = {
  setFormType: React.Dispatch<React.SetStateAction<AuthFormType>>;
  type: AuthFormType;
};

export const HeadingAuth = ({ type, setFormType }: HeadingAuthProps) => {
  let titleText = "";
  let question = "";
  let linkText = "";
  let linkTo = "";

  switch (type) {
    case "register":
      titleText = "Register";
      question = "Already have an account?";
      linkText = "Sign in.";
      linkTo = "signin";
      break;

    case "signin":
      titleText = "Login";
      question = "Don't have an account?";
      linkText = "Create one.";
      linkTo = "register";
      break;

    case "forgotpassword":
      titleText = "Forgot your password?";
      question = "Remembered your password?";
      linkText = "Sign in.";
      linkTo = "signin";
      break;

    case "entercode":
      titleText = "Enter your verification code";
      question = "Didn't receive the code?";
      linkText = "Resend it.";
      linkTo = "forgotpassword";

      break;

    default:
      titleText = "Authentication";
      question = "";
      linkText = "";
      break;
  }

  return (
    <div>
      <div className="mb-6 mt-3 md:mb-9 md:mt-6 space-y-1.5">
        <h1 className="text-2xl font-semibold">{titleText}</h1>
        {question && (
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-lg">
            {question + " "}
            <button
              onClick={() =>
                linkTo ? setFormType(linkTo as AuthFormType) : null
              }
              className="text-sky-600 dark:text-sky-400 hover:underline">
              {linkText}
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
