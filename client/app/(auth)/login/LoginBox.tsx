/* eslint-disable react/no-unescaped-entities */
"use client";

// Dependencies
import Link from "next/link";
import useSWR from "swr";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import InputButton from "../_ui/InputButton";

export default function LoginClient() {
  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const fetcher = (url: string, credentials: FormData) =>
      fetch(url).then((res) => res.json());
    const { data, error } = useSWR(
      ["localhost:5050/auth/login", formData],
      ([url, formData]) => fetcher(url, formData)
    );

    console.log(data, error);
  };

  return (
    <form onSubmit={HandleSubmit}>
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
