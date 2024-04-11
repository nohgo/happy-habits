import Image from "next/image";
import Link from "next/link";

export default function Logo({
  size = 200,
  route,
}: {
  size?: number;
  route: string;
}) {
  return (
    <Link href={route} className="inline-block ml-10 mt-5">
      <Image
        src="/happy-habits-light.svg"
        alt="Happy Habits Logo"
        className="dark:hidden block"
        width={size}
        height={size}
        priority
      />
      <Image
        src="/happy-habits-dark.svg"
        alt="Happy Habits Logo"
        className="hidden dark:block"
        width={size}
        height={size}
        priority
      />
    </Link>
  );
}
