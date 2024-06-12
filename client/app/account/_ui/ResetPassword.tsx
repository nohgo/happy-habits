"use client";
import { useRouter } from "next/navigation";

export default function ResetPassword({}) {
  const router = useRouter();
  return (
    <div className="py-5">
      <h1 className="inline pb-1 text-4xl dark:text-white">Reset Password: </h1>
      <button
        className="ml-2 inline h-12 rounded-2xl border border-accent-border bg-accent-main px-2 text-2xl transition hover:brightness-90"
        onClick={() => router.push("/forgot-password")}
      >
        Reset Password
      </button>
    </div>
  );
}
