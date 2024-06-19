"use server";
export default async function verifyEmail(token: string) {
  const response = await fetch(
    `${process.env.SERVER_URL}/api/user/verify-email`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-verify-token": `Bearer ${token}`,
      },
    },
  );

  return response.status;
}

export async function verifyEmailSend(email: string) {
  const response = await fetch(
    `${process.env.SERVER_URL}/api/user/verify-email?email=${encodeURI(email)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  switch (response.status) {
    case 200:
      return true;
    case 404:
      return false;
    default:
      return false;
  }
}
