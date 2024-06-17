"use client";

import InputBox, { IInputBox } from "@/app/(auth)/_ui/InputBox";
import deleteAccount from "../_lib/deleteAccount";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteAccountButton({}) {
  const inputBoxProps: IInputBox = {
    id: "password",
    placeholder: "Password",
    type: "password",
    invalidError: "Please enter a valid password",
  };
  const router = useRouter();
  const [isInvalid, setIsInvalid] = useState(false);

  const deleteAccountHandling = async (formData: FormData) => {
    try {
      await deleteAccount(formData);
      router.push("/register");
    } catch (e) {
      setIsInvalid(true);
    }
  };

  return (
    <div className="space-y-3 py-7">
      <h1 className="text-4xl dark:text-white">Delete Account:</h1>
      <form className="" action={deleteAccountHandling}>
        <InputBox {...inputBoxProps} />
        {isInvalid ? (
          <p className="mt-1 text-red-500">This password is incorrect</p>
        ) : (
          <></>
        )}
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
