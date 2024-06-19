import LogoBlock from "./_ui/LogoBlock";
import NavBar from "./_ui/NavBar";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <video className="absolute top-20 opacity-10" autoPlay muted loop>
        <source src="/landing-video.mp4" type="video/mp4" />
      </video>
      <div className="z-10">
        <NavBar /> <LogoBlock />
      </div>
      <Link
        className="z-10 mt-5 w-fit rounded-lg bg-accent-main p-3 text-2xl transition-all hover:brightness-75 dark:text-white"
        href="/register"
      >
        Register Now
      </Link>
    </div>
  );
}
