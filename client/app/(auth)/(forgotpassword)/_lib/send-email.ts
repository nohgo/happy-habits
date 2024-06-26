"use server";
export default async function sendEmail(formData: FormData) {
  const email = formData.get("email") as string;

  const response = await fetch(
    `${process.env.SERVER_URL}/api/user/forgot-password`,
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
