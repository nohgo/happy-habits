export default function AuthButton({ text }: { text: string }) {
  return (
    <button className="rounded-full w-64 h-14 bg-accent-main border border-accent-border transition hover:brightness-105 text-xl">
      {text}
    </button>
  );
}
