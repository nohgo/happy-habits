/* eslint-disable react/no-unescaped-entities */
"use client";

// Dependencies
import Link from "next/link";
import login from "../_lib/login";
import { useState } from "react";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import InputButton from "../_ui/InputButton";

export default function LoginClient() {
  const [response, setResponse] = useState();

  console.log(response);

  async function setCookies(formData: FormData) {
    const response = await login(formData);
    setResponse(response);
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
          <InputButton text="Log in" />
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
