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
        }
      },
      index: 0,
      placeholder: "Email",
      id: "email",
    },
    {
      action: async (formData: FormData) => {
        if (await usernameAvailable(formData)) {
          setUser(() => ({
            ...user,
            username: formData.get("username") as string,
          }));
          setStep(step + 1);
        }
      },
      index: 1,
      placeholder: "Username",
      id: "username",
    },
    {
      action: async (formData: FormData) => {
        const newUser = {
          ...user,
          password: formData.get("password") as string,
        };
        const worked = await register(newUser);
        worked ? router.push("/login") : router.push("/register");
      },
      index: 2,
      placeholder: "Password",
      id: "password",
    },
  ];
  return (
    <ContainerBox>
      <div className="text-3xl mt-10 dark:text-grayscale-50">
        Register for Happy Habits
      </div>
      {<Step key={step} {...steps[step]} />}
      <Link
        href="/login"
        className="dark:text-grayscale-50 underline block transition hover:no-underline"
      >
        Already have an account? Log in
      </Link>
    </ContainerBox>
  );
}
