import Logo from "../../_ui/Logo";

export default function AuthBasic({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-y-scroll bg-gradient-to-t from-grayscale-200 to-grayscale-50 px-10 pt-5 dark:from-grayscale-950 dark:to-grayscale-600">
      <Logo route="/" />
      <div className="flex items-center justify-center">{children}</div>
    </div>
  );
}
