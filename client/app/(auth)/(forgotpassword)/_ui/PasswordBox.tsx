/* eslint-disable react/no-unescaped-entities */
"use client";

import { Suspense } from "react";
import ContainerBox from "../../_ui/ContainerBox";
import InputBox from "../../_ui/InputBox";
import Button from "../../_ui/Button";
import sendEmail from "../_lib/send-email";
import { useState } from "react";
import resetPassword from "../_lib/reset-password";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ForgotPasswordBox({
  isForgotPassword,
}: {
  isForgotPassword: boolean;
}) {
  const [token, setToken] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!isForgotPassword) {
      setToken(searchParams.get("token"));
    }
  }, [isForgotPassword, searchParams]);

  const [isInvalid, setIsInvalid] = useState(false);

  const props = isForgotPassword
    ? {
        title: "Forgot Password",
        buttonText: "Send Email",
        onSubmit: sendEmail,
        idtype: "email",
        placeholder: "Email address",
        invalidError: "Please enter a valid email address.",
        route: "forgot-password/success",
      }
    : {
        title: "Reset Password",
        buttonText: "Reset Password",
        onSubmit: (formData: FormData) => resetPassword(formData, token),
        idtype: "password",
        placeholder: "New Password",
        invalidError: "Please enter a valid password.",
        route: "login",
      };

  async function forgotPassword(formData: FormData) {
    const { status } = await props.onSubmit(formData);

    if (status != 200) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    router.push(props.route);
  }

  return (
    <ContainerBox>
      <Suspense>
        <form
          action={forgotPassword}
          className="flex flex-grow flex-col items-center justify-between px-10"
        >
          <div className="mt-10 text-3xl dark:text-grayscale-50">
            {props.title}
          </div>
          <InputBox
            id={props.idtype}
            placeholder={props.placeholder}
            type={props.idtype}
            invalidError={props.invalidError}
          />
          <Button
            text={props.buttonText}
            isInvalid={isInvalid}
            invalidMessage="Something went wrong. Please try again."
          />
        </form>
      </Suspense>
    </ContainerBox>
  );
}
