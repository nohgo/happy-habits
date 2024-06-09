import DeleteAccountButton from "./DeleteAccountButton";
import LogoutButton from "./LogoutButton";

export default function MainContent({}) {
  return (
    <ul className={"list-none"}>
      <LogoutButton /> <DeleteAccountButton />
    </ul>
  );
}
