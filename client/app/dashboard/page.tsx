import Logo from "@/app/_ui/Logo";
import Image from "next/image";
import GridContainer from "./_ui/GridContainer";
import Link from "next/link";

export const metadata = {
  title: "Dashboard | Happy Habits",
  description: "Manage all your habits in one place",
};

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col justify-between bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="/" />
        <Link href={"/account"}>
          {" "}
          <Image
            src="user-icon.svg"
            alt="User menu"
            width={50}
            height={50}
          />{" "}
        </Link>
      </div>
      <div className="mb-10 mt-5 flex h-[85%] justify-between">
        <GridContainer />
      </div>
    </div>
  );
}
