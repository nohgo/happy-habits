import Image from "next/image";
import Link from "next/link";

interface ILogo {
  size?: number;
  route: string;
}

export default function Logo({ size = 200, route }: ILogo) {
  return (
    <Link href={route} className="inline-block">
      <Image
        src="/happy-habits-light-mode.svg"
        alt="Happy Habits Logo"
        className="block dark:hidden"
        width={size}
        height={size}
        priority
      />
      <Image
        src="/happy-habits-dark-mode.svg"
        alt="Happy Habits Logo"
        className="hidden dark:block"
        width={size}
        height={size}
        priority
      />
    </Link>
  );
}
