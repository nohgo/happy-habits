import LoginBox from "./LoginBox";
import Logo from "../../_ui/Logo";

export const metadata = { title: "Login", description: "Login page" };

export default function Login() {
  return (
    <div className="bg-gradient-to-t from-grayscale-300 min-h-screen to-grayscale-50 dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex justify-center items-center">
        <LoginBox />
      </div>
    </div>
  );
}
