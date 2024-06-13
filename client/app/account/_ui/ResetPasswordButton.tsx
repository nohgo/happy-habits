"use client";
import { useRouter } from "next/navigation";

export default function ResetPasswordButton() {
  const router = useRouter();
  return (
    <button
      className="ml-2 inline h-12 rounded-2xl border border-accent-border bg-accent-main px-2 text-2xl transition hover:brightness-90"
      onClick={() => router.push("/forgot-password")}
    >
      Reset Password
    </button>
  );
}
