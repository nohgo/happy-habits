"use server";

import { cookies } from "next/headers";

export default async function deleteAccount(formData: FormData) {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User does not have authorization");

  const password = formData.get("password") as string;
  const response = await fetch(`${process.env.SERVER_URL}/api/user`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
    body: JSON.stringify({
      password,
    }),
  });
  if (response.status != 200) throw new Error();
}
