import PasswordBox from "../_ui/PasswordBox";
import AuthBasic from "../../_ui/AuthBasic";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <AuthBasic>
      <PasswordBox isForgotPassword={true} />
    </AuthBasic>
  );
}
