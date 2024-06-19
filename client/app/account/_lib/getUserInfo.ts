"use server";

import { cookies } from "next/headers";

export default async function getUserInfo() {
  const authorization = cookies().get("token")?.value;
  if (!authorization) throw new Error("User does not have authorization");

  const response = await fetch(`${process.env.SERVER_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization,
    },
  });
  if (response.status != 200) throw new Error();
  return (await response.json()) as unknown as {
    email: string;
    username: string;
  };
}
