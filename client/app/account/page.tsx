import MainContent from "./_ui/MainContent";
import Link from "next/link";
import Image from "next/image";
import Logo from "../_ui/Logo";

export const metadata = {
  description: "Manage your happy habits account",
  title: "Happy Habits | Account",
};

export default function Account() {
  return (
    <div className="h-screen bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="/dashboard" />
        <Link href="/account">
          {" "}
          <Image
            src="user-icon.svg"
            alt="User menu"
            width={50}
            height={50}
          />{" "}
        </Link>
      </div>
      <MainContent />
    </div>
  );
}
