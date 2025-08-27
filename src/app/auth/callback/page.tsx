"use client";

import { supabaseCLIENT } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";



export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const extractHashParams = () => {
      if (typeof window === "undefined") return {};

      const hash = window.location.hash.substring(1); // Remove the '#'
      return Object.fromEntries(new URLSearchParams(hash));
    };

    const handleAuthRedirect = async () => {
      const { access_token, refresh_token, error, error_code, error_description } =
        extractHashParams();

      if (error) {
        setStatus("error");

        if (error_code === "otp_expired") {
          setErrorMessage("Your confirmation link has expired. Please request a new one.");
        } else if (error_code === "invalid_grant") {
          setErrorMessage("This confirmation link is invalid or has already been used.");
        } else {
          setErrorMessage(error_description || "An unknown error occurred. Please try again.");
        }

        return;
      }

      if (access_token && refresh_token) {
        const { error: loginError } = await supabaseCLIENT.auth.setSession({
          access_token,
          refresh_token,
        });

        if (loginError) {
          setStatus("error");
          setErrorMessage("Failed to log in. Please try again.");
        } else {
          setStatus("success");
          setTimeout(() => {
            router.replace("/"); // Redirect to dashboard after success
          }, 2000);
        }
      }
    };

    handleAuthRedirect();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6">
      {status === "loading" && (
        <p className="text-gray-600 text-lg">Verifying your account...</p>
      )}

      {status === "success" && (
        <p className="text-green-600 text-lg font-semibold">🎉 Account verified! Redirecting...</p>
      )}

      {status === "error" && (
        <div className="text-red-600 text-lg font-semibold">
          ❌ {errorMessage}
          <br />
          <a href="/resend-verification" className="underline text-blue-600">
            Resend verification email
          </a>
        </div>
      )}
    </div>
  );
}
