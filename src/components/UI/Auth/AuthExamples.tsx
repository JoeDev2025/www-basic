"use client";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import { FiLogIn, FiUserPlus } from "react-icons/fi";
import { GleamButton } from "../Buttons/GleamButton";
import { useAuthModal } from "./AuthModalProvider";

export default function AuthExamples() {
	const { openAuthModal } = useAuthModal();
	return (
		<>
			<div className="flex flex-wrap justify-center gap-2 md:gap-6 items-center py-6">
				{/* Sign In */}
				<GleamButton onClick={() => openAuthModal("signin")} icon={<FiLogIn />}>
					Sign In
				</GleamButton>
				{/* Register/Create Account */}
				<GleamButton
					colorStyle="emerald"
					onClick={() => openAuthModal("register")}
					icon={<FiUserPlus />}>
					Register
				</GleamButton>
				{/* Forgot Password */}
				<GleamButton
					colorStyle="orange"
					onClick={() => openAuthModal("forgotpassword")}
					icon={<FiUserPlus />}>
					Forgot Password
				</GleamButton>
				{/* Enter Code */}
				<GleamButton
					colorStyle="red"
					onClick={() => openAuthModal("entercode")}
					icon={<FiUserPlus />}>
					Enter Code
				</GleamButton>
			</div>
			<div className="mx-auto max-w-3xl">
				<HowToUse />
			</div>
		</>
	);
}

// Above code but simplified to be as lean as possible
const simpleCode = `"use client";
import { useAuthModal } from "./AuthModalProvider";
export default function AuthExamples() {
  const { openAuthModal } = useAuthModal();
  return <>
        <button onClick={() => openAuthModal("signin")}>Sign In</button>
       	<button onClick={() => openAuthModal("register")}>Register</button>
        <button onClick={() => openAuthModal("forgotpassword")}>Forgot Password</button>
        <button onClick={() => openAuthModal("entercode")}>Enter Code</button>
    </>
}`;

const HowToUse = () => (
  <div className="relative w-full rounded-xl bg-zinc-800 shadow-xl">
    <div className="flex w-full gap-1.5 rounded-t-xl bg-zinc-900 p-3">
      <div className="h-3 w-3 rounded-full bg-red-500" />
      <div className="h-3 w-3 rounded-full bg-yellow-500" />
      <div className="h-3 w-3 rounded-full bg-green-500" />
    </div>
    <div className="p-2">
      <div className="font-mono text-sm text-slate-200">
        <span className="text-green-300">~</span> How to use:
        <pre className="rounded bg-green-600/10 px-1 font-semibold my-3 text-xs overflow-scroll">
          {simpleCode}
        </pre>
        <span>
          Please note template.tsx has been wrapped in the
          &lt;AuthModalProvider&gt;
        </span>
      </div>
    </div>

    <span className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%] text-9xl text-slate-700">
      <CodeBracketSquareIcon />
    </span>
  </div>
);
