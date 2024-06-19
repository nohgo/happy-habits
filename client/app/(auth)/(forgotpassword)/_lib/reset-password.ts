"use server";
export default async function resetPassword(
  formData: FormData,
  token: string | null,
) {
  if (!token || token === null) {
    return { res: "No token provided", status: 400 };
  }
  const password = formData.get("password") as string;

  const response = await fetch("http://localhost:5050/api/user/password", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "auth-reset-token": "Bearer " + token,
    },
    body: JSON.stringify({
      newPassword: password,
    }),
  });

  return { res: response.json(), status: response.status };
}
