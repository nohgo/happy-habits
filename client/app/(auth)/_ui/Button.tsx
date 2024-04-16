import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function Button({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="mb-3 flex h-14 w-64 items-center justify-center rounded-full border border-accent-border bg-accent-main text-xl transition hover:brightness-105 disabled:brightness-75"
      disabled={pending}
    >
      <Image
        src="/loader.svg"
        alt="Loading..."
        className={`animate-spin ${pending ? "block" : "hidden"}`}
        width="35"
        height="35"
      />
      {pending ? "" : text}
    </button>
  );
}
