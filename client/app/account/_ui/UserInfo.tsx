"use client";
import { useRouter } from "next/navigation";
import getUserInfo from "../_lib/getUserInfo";
import { useEffect, useState } from "react";

export default function UserInfo() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({ email: "", username: "" });

  useEffect(() => {
    getUserInfo()
      .then((info) => setUserInfo(info))
      .catch(() => router.push("/login"));
  }, [router]);

  return (
    <>
      <h1 className="text-4xl dark:text-white">
        Username: {userInfo.username}
      </h1>
      <h1 className="text-4xl dark:text-white">Email: {userInfo.email}</h1>
    </>
  );
}
