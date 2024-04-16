/* eslint-disable react/no-unescaped-entities */

// Dependencies
import Link from "next/link";

// Assets
import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import InputButton from "../_ui/InputButton";

export default function LoginClient() {
  async function checkUser(formData: FormData) {
    "use server";

    const usernameEmail = formData.get("emailUsername") as string;
    const password = formData.get("password") as string;

    const response = await fetch("localhost:5050/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        usernameEmail,
        password,
      }),
    });
    console.log(await response.json());
  }

  return (
    <form action={checkUser}>
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
