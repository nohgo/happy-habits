//! THIS METHOD DOES NOT WORK IT DOES NOT WORK
//backend needs to be refactored to have an endpoint that parses the authorization token for a login
//or we can just call the reset password method that sends an email and call it a day

"use server";

import { cookies } from "next/headers";

export default async function updatePassword(
  newPassword: string,
  password: string,
) {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User has no authorization token");

  await fetch("http://localhost:5050/api/auth/update-password", {
    method: "POST",
    headers: { "Content-Type": "application/json", authorization },
    body: JSON.stringify({
      newPassword,
      password,
    }),
  });
}
