"use server";

import { cookies } from "next/headers";

export default async function checkUser(formData: FormData) {
  const emailUsername = formData.get("emailUsername") as string;
  const password = formData.get("password") as string;

  const response = await fetch("http://localhost:5050/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emailUsername,
      password,
    }),
  });

  // switch secure to true before prod
  cookies().set("token", `Bearer ${(await response.json()).token}`, {
    secure: false,
    httpOnly: true,
    maxAge: 60000 * 30,
  });

  return { status: response.status };
}
