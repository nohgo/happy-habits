import Link from "next/link";
import Logo from "./Logo";

export default function NavBar({}) {
  return (
    <div className="flex justify-between">
      <Logo route="" />
      <div>
        <Link className="mr-2 text-2xl" href="/login">
          Log in
        </Link>{" "}
        <Link
          className="rounded-lg bg-accent-main p-3  text-2xl"
          href="/register"
        >
          Sign Up
        </Link>
      </div>{" "}
    </div>
  );
}
