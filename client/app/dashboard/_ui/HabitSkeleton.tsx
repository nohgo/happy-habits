"use client";
import Image from "next/image";

export default function HabitSkeleton({ loading }: { loading: boolean }) {
  return (
    <div
      className={`${loading ? "block" : "hidden"} flex h-80 flex-col justify-between rounded-xl bg-grayscale-400 p-5`}
    >
      <div className="flex animate-pulse">
        <div className="h-7 w-3/4 rounded-full bg-grayscale-300"></div>
        <div className="flex w-1/4 justify-around">
          <div className="h-7 w-7 rounded-full bg-grayscale-300"></div>
          <div className="h-7 w-7 rounded-full bg-grayscale-300"></div>
        </div>
      </div>
      {[...Array(2)].map(() => (
        <>
          <div className="h-5 w-full animate-pulse rounded-full bg-grayscale-300"></div>
          <div className="h-5 w-3/4 animate-pulse rounded-full bg-grayscale-300"></div>
        </>
      ))}
      <div className="h-10 w-full animate-pulse rounded-full bg-grayscale-300"></div>
    </div>
  );
}
