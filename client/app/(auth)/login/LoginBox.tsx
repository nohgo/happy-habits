/* eslint-disable react/no-unescaped-entities */
"use client";

// Dependencies
import Link from "next/link";
import checkUser from "./_lib/check-user";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import Button from "../_ui/Button";
import { verifyEmail } from "../register/_lib/register";

export default function LoginBox() {
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  async function setCookies(formData: FormData) {
    const status: number = await checkUser(formData).catch(() => 404);

    if (status == 200) {
      router.push("/dashboard");
    } else if (status == 501) {
      await verifyEmail(formData.get("emailUsername") as string);
      router.push("/verify-email");
    } else setIsInvalid(true);
  }

  return (
    <ContainerBox>
      <form
        action={setCookies}
        className="flex flex-grow flex-col items-center justify-between"
      >
        <div className="mt-10 text-3xl dark:text-grayscale-50">
          Log in to Happy Habits
        </div>
        <InputBox
          id="emailUsername"
          placeholder="Email or username"
          invalidError="Please enter a valid email or username."
        />
        <InputBox
          id="password"
          placeholder="Password"
          type="password"
          invalidError="Please enter a valid password."
        />
        <div className="flex flex-col items-center justify-center">
          <Button
            text="Log in"
            isInvalid={isInvalid}
            invalidMessage="Failed to log in. Please try again."
          />
          <Link
            href="/forgot-password"
            className="block underline transition hover:no-underline dark:text-grayscale-50"
          >
            Forgot password
          </Link>
          <Link
            href="/register"
            className="block underline transition hover:no-underline dark:text-grayscale-50"
          >
            Don't have an account? Register
          </Link>
        </div>
      </form>
    </ContainerBox>
  );
}
