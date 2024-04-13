/* eslint-disable react/no-unescaped-entities */
"use client";

// Dependencies
import Link from "next/link";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import InputButton from "../_ui/InputButton";

export default function LoginClient() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    console.log(Object.fromEntries(formData.entries()));
  };

  return (
    <form onSubmit={handleSubmit}>
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
