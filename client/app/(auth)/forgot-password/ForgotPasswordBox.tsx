/* eslint-disable react/no-unescaped-entities */
"use client";

import ContainerBox from "../_ui/ContainerBox";
import InputBox from "../_ui/InputBox";
import Button from "../_ui/Button";

export default function ForgotPasswordBox() {
  async function sendEmail(formData: FormData) {}

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
        <Button text="Reset password" />
      </form>
    </ContainerBox>
  );
}
