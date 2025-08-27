"use client";

import { ReactNode } from "react";
import { AuthModalProvider } from "./AuthModalProvider";

type ClientAuthWrapperProps = {
	children: ReactNode;
};

export const ClientAuthWrapper = ({ children }: ClientAuthWrapperProps) => {
	return <AuthModalProvider>{children}</AuthModalProvider>;
};
