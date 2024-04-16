import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="flex justify-center items-center disabled:brightness-75 mb-3 rounded-full w-64 h-14 bg-accent-main border border-accent-border transition hover:brightness-105 text-xl"
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
