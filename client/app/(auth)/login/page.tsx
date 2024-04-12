import LoginClient from "./LoginBox";
import Logo from "../../_ui/logo";

export const metadata = { title: "Login", description: "Login page" };

export default function Login() {
  return (
    <div className="overflow-y-scroll bg-gradient-to-t from-grayscale-300 min-h-screen to-grayscale-50 dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex justify-center items-center">
        <LoginClient />
      </div>
    </div>
  );
}
