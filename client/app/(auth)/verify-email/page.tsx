"use client";
import Logo from "@/app/_ui/Logo";
import Link from "next/link";
import Image from "next/image";
export default function VerifyEmail() {
  return (
    <div className="h-screen bg-gradient-to-t from-grayscale-300 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="/dashboard" />
        <Link href="/account">
          <Image src="user-icon.svg" alt="User menu" width={50} height={50} />
        </Link>
      </div>
      <div className="mt-5 flex h-5/6 flex-col justify-around space-y-5 rounded-2xl bg-grayscale-300 p-10 dark:bg-grayscale-bg-dark">
        <div>
          <h1 className="text-center text-4xl dark:text-white">
            A link has been sent to your email to verify your account.
          </h1>
          <h2 className="text-center text-2xl dark:text-white">
            Be sure to check your spam folder.
          </h2>
        </div>
      </div>
    </div>
  );
}
