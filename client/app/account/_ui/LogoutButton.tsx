"use client";

import logout from "../_lib/logout";

export default function LogoutButton({}) {
  return (
    <div className="py-5">
      <h1 className="inline pb-1 text-4xl dark:text-white">Logout:</h1>
      <button
        className="ml-2 inline h-12 rounded-2xl border border-accent-border bg-accent-main px-2 text-2xl transition hover:brightness-90"
        onClick={() => logout()}
      >
        Logout
      </button>
    </div>
  );
}
