import React from "react";

export default function AuthBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-12 py-2 flex justify-between items-center flex-col w-[28rem] h-[28rem] rounded-md bg-grayscale-bg-light dark:bg-grayscale-bg-dark border-accent-border border">
      {children}
    </div>
  );
}
