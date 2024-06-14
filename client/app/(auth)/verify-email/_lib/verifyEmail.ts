"use server";
export async function verifyEmail(token: string) {
  const response = await fetch("http://localhost:5050/api/user/verify-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-verify-token": `Bearer ${token}`,
    },
  });

  return response.status;
}
