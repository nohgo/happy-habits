import RegisterBox from "./RegisterBox";
import AuthBasic from "../_ui/AuthBasic";

export const metadata = { title: "Register", description: "Signup Page" };

export default function Login() {
  return (
    <AuthBasic>
      <RegisterBox />
    </AuthBasic>
  );
}
