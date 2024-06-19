import LogoBlock from "./_ui/LogoBlock";
import NavBar from "./_ui/NavBar";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      {" "}
      <NavBar /> <LogoBlock />
    </div>
  );
}
