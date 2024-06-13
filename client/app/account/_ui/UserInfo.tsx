import getUserInfo from "../_lib/getUserInfo";

export default async function UserInfo() {
  const { username, email } = await getUserInfo();
  return (
    <>
      <h1 className="text-4xl dark:text-white">Username: {username}</h1>
      <h1 className="text-4xl dark:text-white">Email: {email}</h1>
    </>
  );
}
