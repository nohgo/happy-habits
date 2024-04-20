/* eslint-disable react/no-unescaped-entities */
"use client";

import ContainerBox from "../../_ui/ContainerBox";
import InputBox from "../../_ui/InputBox";
import Button from "../../_ui/Button";
import sendEmail from "../_lib/send-email";
import { useState } from "react";
import resetPassword from "../_lib/reset-password";
import { useEffect } from "react";

export default function ForgotPasswordBox({
  isForgotPassword,
}: {
  isForgotPassword: boolean;
}) {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = new URLSearchParams(new URL(window.location.href).search).get(
      "token",
    );
    setToken(token);
  }, []);

  const [isInvalid, setIsInvalid] = useState(false);

  const props = isForgotPassword
    ? {
        title: "Forgot Password",
        buttonText: "Send Email",
        onSubmit: sendEmail,
        idtype: "email",
        placeholder: "Email address",
        invalidError: "Please enter a valid email address.",
      }
    : {
        title: "Reset Password",
        buttonText: "Reset Password",
        onSubmit: (formData: FormData) => resetPassword(formData, token),
        idtype: "password",
        placeholder: "New Password",
        invalidError: "Please enter a valid password.",
      };

  async function forgotPassword(formData: FormData) {
    const { status } = await props.onSubmit(formData);

    if (status != 200) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
    //! REROUTE TO PAGE THAT SAYS THEY SUCCESFULLY RESET PASSWORD
  }

  return (
    <ContainerBox>
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
    </ContainerBox>
  );
}
