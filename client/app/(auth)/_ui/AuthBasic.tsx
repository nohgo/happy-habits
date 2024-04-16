import Logo from "../../_ui/Logo";

export default function AuthBasic({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-scroll bg-gradient-to-t from-grayscale-300 min-h-screen to-grayscale-50 dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex justify-center items-center">{children}</div>
    </div>
  );
}
