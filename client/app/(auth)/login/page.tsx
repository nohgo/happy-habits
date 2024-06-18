import LoginBox from "./LoginBox";
import AuthBasic from "../_ui/AuthBasic";

export const metadata = {
  title: "Happy Habits | Login",
  description: "Login page",
};

export default function Login() {
  return (
    <AuthBasic>
      <LoginBox />
    </AuthBasic>
  );
}
