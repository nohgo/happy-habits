"use server";
export default async function sendEmail(formData: FormData) {
  const email = formData.get("email") as string;

  const response = await fetch(
    "http://localhost:5050/api/auth/forgotPassword",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    },
  );
  return { res: response.json(), status: response.status };
}
