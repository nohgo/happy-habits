import Logo from "@/app/_ui/Logo";

export default function NavBar() {
  return (
    <div className="flex flex-col justify-between bg-gray-200">
      <Logo route={"/dashboard"} />
      <div></div>
    </div>
  );
}
