import Image from "next/image";

export default function LogoBlock({}) {
  return (
    <div className="flex justify-center pt-20">
      <Image
        src="/big-logo-light.svg"
        alt="Happy Habits Logo"
        width={400}
        height={400}
        className="block dark:hidden"
      />
      <Image
        src="/big-logo-dark.svg"
        alt="Happy Habits Logo"
        width={400}
        height={400}
        className="hidden dark:block"
        priority
      />
      <h1 className="ml-10 w-1/3 pt-14 text-7xl font-bold dark:text-white">
        A habit tracker built for happy people.
      </h1>
    </div>
  );
}
