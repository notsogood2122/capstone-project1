"use client";
import { useRouter } from "next/navigation";

const LoginButton = () => {
  const router = useRouter();
  return (
    <button
      className="bg-[#6A5ACD] text-white px-4 py-2 rounded"
      onClick={() => router.push("/sign-in")}
    >
      Login
    </button>
  );
};

export default LoginButton;
