"use client";

import InputBox, { IInputBox } from "@/app/(auth)/_ui/InputBox";
import deleteAccount from "../_lib/deleteAccount";

export default function DeleteAccountButton({}) {
  const inputBoxProps: IInputBox = {
    id: "password",
    placeholder: "Password",
    type: "password",
    invalidError: "Please enter a valid password",
  };
  return (
    <form action={deleteAccount}>
      <InputBox {...inputBoxProps} />
    </form>
  );
}
