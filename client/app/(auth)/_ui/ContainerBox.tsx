import React from "react";

export default function ContainerBox({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-between items-center py-2 w-[28rem] h-[28rem] rounded-md bg-grayscale-bg-light dark:bg-grayscale-bg-dark border-accent-border border">
      {children}
    </div>
  );
}
