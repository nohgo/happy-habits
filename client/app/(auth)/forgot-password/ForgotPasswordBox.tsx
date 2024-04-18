/* eslint-disable react/no-unescaped-entities */
"use client";

import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import Button from "../_ui/Button";
import sendEmail from "./_lib/send-email";
import { useState } from "react";

export default function ForgotPasswordBox() {
  const [isInvalid, setIsInvalid] = useState(false);

  async function forgotPassword(formData: FormData) {
    const { res, status } = await sendEmail(formData);

    if (status != 200) {
      setIsInvalid(true);
      return;
    }
    setIsInvalid(false);
  }

  return (
    <ContainerBox>
      <form
        action={sendEmail}
        className="flex flex-grow flex-col items-center justify-between px-10"
      >
        <div className="mt-10 text-3xl dark:text-grayscale-50">
          Forgot password
        </div>
        <InputBox
          id="email"
          placeholder="Email address"
          type="email"
          invalidError="Please enter a valid email address."
        />
        <Button
          text="Reset password"
          isInvalid={isInvalid}
          invalidMessage="Failed to send email. Please try again."
        />
      </form>
    </ContainerBox>
  );
}
