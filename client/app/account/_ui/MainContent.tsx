import DeleteAccountButton from "./DeleteAccountButton";
import LogoutButton from "./LogoutButton";
import ResetPasswordButton from "./ResetPasswordButton";
import UserInfo from "./UserInfo";

export default function MainContent({}) {
  return (
    <div className="mt-5 h-5/6 space-y-5 rounded-2xl bg-grayscale-300 p-10 dark:bg-grayscale-bg-dark">
      <h1 className="text-center text-7xl font-bold dark:text-white">
        Account
      </h1>
      <UserInfo />
      <LogoutButton />
      <ResetPasswordButton />
      <DeleteAccountButton />
    </div>
  );
}
