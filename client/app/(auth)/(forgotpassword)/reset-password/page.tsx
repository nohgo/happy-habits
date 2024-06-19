import PasswordBox from "../_ui/PasswordBox";
import AuthBasic from "../../_ui/AuthBasic";
import { Suspense } from "react";

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password",
};

export default function ResetPassword() {
  return (
    <AuthBasic>
      <Suspense>
        <PasswordBox isForgotPassword={false} />
      </Suspense>
    </AuthBasic>
  );
}
