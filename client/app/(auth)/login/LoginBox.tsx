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
    const data = await res;
    document.cookie = `token=Bearer ${data.token}`;
    router.push("/");
  }

  return (
    <form action={setCookies}>
      <ContainerBox>
        <div className="text-3xl mt-10 dark:text-grayscale-50">
          Log in to Happy Habits
        </div>
        <InputBox id="emailUsername" placeholder="Email or username" />

        <InputBox id="password" placeholder="Password" />

        <div className="flex justify-center items-center flex-col">
          <Button text="Log in" />

          <Link
            href="/"
            className="dark:text-grayscale-50 underline block transition hover:no-underline"
          >
            Forgot password
          </Link>

          <Link
            href="/"
            className="dark:text-grayscale-50 underline block transition hover:no-underline"
          >
            Don't have an account? Register
          </Link>
        </div>
      </ContainerBox>
    </form>
  );
}
