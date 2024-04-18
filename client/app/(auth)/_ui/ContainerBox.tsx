import React from "react";

interface IContainerBox {
  children: React.ReactNode;
}

export default function ContainerBox({ children }: IContainerBox) {
  return (
    <div className="flex h-[28rem] w-[28rem] flex-col items-center justify-between rounded-md border border-accent-border bg-grayscale-bg-light py-2 dark:bg-grayscale-bg-dark">
      {children}
    </div>
  );
}
