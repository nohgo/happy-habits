"use client";

import ContainerBox from "../_ui/ContainerBox";
import { useState } from "react";
import Link from "next/link";
import Step from "./_ui/Step";
import { emailAvailable, usernameAvailable } from "./_lib/register";
import register from "./_lib/register";
import { useRouter } from "next/navigation";

export default function RegisterBox() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [isInvalid, setIsInvalid] = useState(false);
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const steps = [
    {
      action: async (formData: FormData) => {
        if (await emailAvailable(formData)) {
          setUser(() => ({
            ...user,
            email: formData.get("email") as string,
          }));
          setStep(step + 1);
          setIsInvalid(false);
        }
        else {
          setIsInvalid(true);
        }
      },
      index: 0,
      placeholder: "Email",
      id: "email",
      type: "email",
      invalidError: "Enter a valid email.",
      isInvalid: isInvalid,
      invalidMessage: "Email is already taken.",
    },
    {
      action: async (formData: FormData) => {
        if (await usernameAvailable(formData)) {
          setUser(() => ({
            ...user,
            username: formData.get("username") as string,
          }));
          setStep(step + 1);
          setIsInvalid(false);
        }
        else {
          setIsInvalid(true);
        }
      },
      index: 1,
      placeholder: "Username",
      id: "username",
      invalidError: "Enter a valid username.",
      pattern: "[a-zA-Z0-9]{3,15}",
      isInvalid: isInvalid,
      invalidMessage: "Username is already taken.",
    },
    {
      action: async (formData: FormData) => {
        const newUser = {
          ...user,
          password: formData.get("password") as string,
        };
        if (await register(newUser)) {
        router.push("/login");
        setIsInvalid(false);
        }
        else setIsInvalid(true);
      },
      index: 2,
      placeholder: "Password",
      id: "password",
      invalidError: "Enter a valid password.",
      pattern: "(?=(.*[0-9]){2})(?=(.*[!@#$%^&*()-_=+{};:,<.>]){2}).{8,}",
      isInvalid: isInvalid,
      invalidMessage: "Something went wrong. Please try again.",
    },
  ];
  return (
    <ContainerBox>
      {<Step key={step} {...steps[step]} />}
      
    </ContainerBox>
  );
}
