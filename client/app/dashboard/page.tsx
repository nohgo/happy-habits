import Logo from "@/app/_ui/Logo";
import Image from "next/image";
import GridContainer from "./_ui/GridContainer";

export const metadata = {
  title: "Dashboard | Happy Habits",
  description: "Manage all your habits in one place",
};

export default function Dashboard() {
  return (
    <div className="flex h-screen flex-col justify-between bg-gradient-to-t from-grayscale-300 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <div className="flex items-center justify-between">
        <Logo route="" />
        <Image src="user-icon.svg" alt="User menu" width={50} height={50} />
      </div>
      <div className="mb-10 mt-5 flex h-[85%] justify-between">
        <GridContainer />
      </div>
    </div>
  );
}
