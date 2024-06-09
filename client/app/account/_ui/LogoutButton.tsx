"use client";

import logout from "../_lib/logout";

export default function LogoutButton({}) {
  return (
    <button
      className="h-12 rounded-2xl border border-accent-border bg-accent-main px-2 text-2xl transition hover:brightness-90"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
}
