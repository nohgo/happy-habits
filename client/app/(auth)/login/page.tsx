import Logo from "../../_ui/logo";
import AuthBox from "../_ui/AuthBox";
import InputBox from "../_ui/InputBox";
import AuthButton from "../_ui/AuthButton";
import Link from "next/link";
export const metadata = { title: "Login", description: "Login page" };

export default function Login() {
  return (
    <div className="overflow-y-scroll bg-gradient-to-t from-grayscale-300 to-grayscale-50 min-h-screen dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex justify-center items-center">
        <AuthBox>
          <div className="text-3xl mt-10">Log in to Happy Habits</div>
          <InputBox id="email-username" placeholder="Email or username" />
          <InputBox id="password" placeholder="Password" />
          <div className="flex justify-center items-center flex-col">
            <AuthButton text="Log in"></AuthButton>
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
