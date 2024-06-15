"use client";
import Logo from "@/app/_ui/Logo";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "./_lib/verifyEmail";
export default function VerifyEmail() {
  const [status, setStatus] = useState(-1);
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (token) {
      verifyEmail(token).then((fetchStatus) => {
        setStatus(fetchStatus);
      });
    } else {
      setToken(searchParams.get("token"));
    }
  }, [token]);

  return (
    <div className="h-screen bg-gradient-to-t from-grayscale-300 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="" />
      </div>
      <div className="mt-5 flex h-5/6 flex-col justify-around space-y-5 rounded-2xl bg-grayscale-300 p-10 dark:bg-grayscale-bg-dark">
        <div>
          <h1 className="text-center text-4xl dark:text-white">
            {status === 200
              ? "Your account has been verified successfully."
              : status === 500
                ? "The link you clicked is either invalid or expired."
                : "A link has been sent to your email to verify your account."}
          </h1>
          <h2 className="text-center text-2xl dark:text-white">
            {status === 200
              ? "You can now log in to your account by returning to the login page."
              : status === 500
                ? "Please try logging in again and checking your email."
                : "Be sure to check your spam folder."}
          </h2>
        </div>
      </div>
    </div>
  );
}
