/* eslint-disable react/no-unescaped-entities */
"use client";

// Dependencies
import Link from "next/link";
import login from "../_lib/login";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import Button from "../_ui/Button";

export default function LoginBox() {
  const [isInvalid, setIsInvalid] = useState(false);
  const router = useRouter();

  async function setCookies(formData: FormData) {
    const { res, status } = await login(formData);

    if (status != 200) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    const data = await res;
    document.cookie = `token=Bearer ${data.token}`;
    router.push("/");
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
          <Button text="Log in" />
          <div className={`${isInvalid ? "block" : "hidden"} text-red-500`}>
            Login failed. Please try again.
          </div>
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
