// Dependencies
import { useState } from "react";
import Link from "next/link";

// Assets
import Logo from "../../_ui/logo";
import AuthBox from "../_ui/AuthBox";
import InputBox from "../_ui/InputBox";
import AuthButton from "../_ui/AuthButton";

export const metadata = { title: "Login", description: "Login page" };

export default function Login() {
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasPressed, setHasPressed] = useState(false);
  return (
    <div className="overflow-y-scroll bg-gradient-to-t from-grayscale-300 to-grayscale-50 min-h-screen dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex justify-center items-center">
        <AuthBox>
          <div className="text-3xl mt-10">Log in to Happy Habits</div>
          <InputBox hasPressed={hasPressed} id="email-username" placeholder="Email or username" set={(input: string): void => {setUsernameEmail(input)}} />
          <InputBox hasPressed={hasPressed} id="password" placeholder="Password" set={(input: string): void => {setPassword(input)}} />
          <div className="flex justify-center items-center flex-col">
            <AuthButton text="Log in" set={(): void => {setHasPressed(true)}}></AuthButton>
            <Link
              href="/"
              className="underline block transition hover:no-underline"
            >
              Forgot password
            </Link>
            <Link
              href="/"
              className="underline block transition hover:no-underline"
            >
              Don't have an account? Register
            </Link>
          </div>
        </AuthBox>
      </div>
    </div>
  );
}
