import { useFormStatus } from "react-dom";

export default function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="disabled:brightness-75 mb-3 rounded-full w-64 h-14 bg-accent-main border border-accent-border transition hover:brightness-105 text-xl"
      disabled={pending}
    >
      {text}
    </button>
  );
}
