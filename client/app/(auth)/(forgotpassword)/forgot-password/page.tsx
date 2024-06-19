import PasswordBox from "../_ui/PasswordBox";
import AuthBasic from "../../_ui/AuthBasic";
import { Suspense } from "react";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function ForgotPassword() {
  return (
    <AuthBasic>
      <Suspense>
        <PasswordBox isForgotPassword={true} />
      </Suspense>
    </AuthBasic>
  );
}
