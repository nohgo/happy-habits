"use client";
import Logo from "@/app/_ui/Logo";
import StatusText from "./_ui/StatusText";
import { Suspense } from "react";
export default function VerifyEmail() {
  return (
    <div className="h-screen bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="" />
      </div>
      <div className="mt-5 flex h-5/6 flex-col justify-around space-y-5 rounded-2xl bg-grayscale-300 p-10 dark:bg-grayscale-bg-dark">
        <Suspense>
          <StatusText />
        </Suspense>
      </div>
    </div>
  );
}
