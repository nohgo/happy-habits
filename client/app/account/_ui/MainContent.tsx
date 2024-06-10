import DeleteAccountButton from "./DeleteAccountButton";
import LogoutButton from "./LogoutButton";

export default function MainContent({}) {
  return (
    <div className=" h-5/6 rounded-2xl bg-grayscale-300 px-4 dark:bg-grayscale-bg-dark">
      <h1 className="text-center text-7xl font-bold dark:text-white">
        Account
      </h1>
      <LogoutButton /> <DeleteAccountButton />
    </div>
  );
}
