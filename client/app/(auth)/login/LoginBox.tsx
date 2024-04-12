"use client";

// Dependencies
import { useState } from "react";
import Link from "next/link";

// Assets
import Logo from "../../_ui/logo";
import AuthBox from "../_ui/AuthBox";
import InputBox from "../_ui/InputBox";
import AuthButton from "../_ui/AuthButton";

export default function LoginClient() {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasPressed, setHasPressed] = useState(false);

  console.log(usernameEmail, password);
  return (
    <AuthBox>
      <div className="text-3xl mt-10 dark:text-grayscale-50">
        Log in to Happy Habits
      </div>
      <InputBox
        hasPressed={hasPressed}
        id="email-username"
        placeholder="Email or username"
        set={(input: string): void => {
          setUsernameEmail(input);
        }}
      />
      <InputBox
        hasPressed={hasPressed}
        id="password"
        placeholder="Password"
        set={(input: string): void => {
          setPassword(input);
        }}
      />
      <div className="flex justify-center items-center flex-col">
        <AuthButton
          text="Log in"
          set={(): void => {
            setHasPressed(true);
          }}
        ></AuthButton>
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
    </AuthBox>
  );
}
