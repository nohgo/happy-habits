"use client";

import logout from "../_lib/logout";

export default function LogoutButton({}) {
  return <button onClick={() => logout()}>Logout</button>;
}
