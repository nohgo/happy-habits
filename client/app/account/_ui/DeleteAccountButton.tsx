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
    <div className="py-4">
      <h1 className="text-4xl dark:text-white">Delete Account:</h1>
      <form className="" action={deleteAccount}>
        <InputBox {...inputBoxProps} />
        <button
          type="submit"
          className="text-1xl mt-1 rounded-2xl bg-red-500 px-2"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
}
