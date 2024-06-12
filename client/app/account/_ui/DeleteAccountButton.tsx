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
    <div className="space-y-3 py-7">
      <h1 className="text-4xl dark:text-white">Delete Account:</h1>
      <form className="" action={deleteAccount}>
        <InputBox {...inputBoxProps} />
        <button
          type="submit"
          className="mt-3 rounded-2xl border-2 border-red-700 bg-red-500 px-2 text-xl transition-all hover:brightness-75"
        >
          Delete Account
        </button>
      </form>
    </div>
  );
}
