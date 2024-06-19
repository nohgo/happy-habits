import Link from "next/link";
import Logo from "./Logo";

export default function NavBar({}) {
  return (
    <div className="flex justify-between dark:text-white">
      <Logo route="" />
      <div className="space-x-5">
        <Link
          className="rounded-lg bg-accent-main p-3 text-2xl transition-all hover:brightness-75"
          href="/dashboard"
        >
          Dashboard
        </Link>
        <Link
          className="text-2xl transition-all hover:brightness-75"
          href="/login"
        >
          Log in
        </Link>{" "}
        <Link
          className="rounded-lg bg-accent-main p-3 text-2xl transition-all hover:brightness-75"
          href="/register"
        >
          Sign Up
        </Link>
      </div>{" "}
    </div>
  );
}
