import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import verifyEmail from "../_lib/verifyEmail";

export default function StatusText() {
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
  }, [token, searchParams]);
  return (
    <>
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
    </>
  );
}
