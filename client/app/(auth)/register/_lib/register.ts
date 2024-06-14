"use server";
export async function emailAvailable(formData: FormData) {
  const email = formData.get("email") as string;
  const response = await fetch(
    `http://localhost:5050/api/user/is-email-available?email=${email}`,
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
export async function usernameAvailable(formData: FormData) {
  const username = formData.get("username") as string;
  const response = await fetch(
    `http://localhost:5050/api/user/is-username-available?username=${username}`,
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

export async function verifyEmail(email: string) {
  const response = await fetch(
    `http://localhost:5050/api/user/verify-email?email=${encodeURI(email)}`,
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

interface IRegister {
  email: string;
  username: string;
  password: string;
}
export default async function register(user: IRegister) {
  console.log(user);

  const response = await fetch("http://localhost:5050/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      username: user.username,
      password: user.password,
    }),
  });
  switch (response.status) {
    case 201:
      return true;
    default:
      return false;
  }
}
