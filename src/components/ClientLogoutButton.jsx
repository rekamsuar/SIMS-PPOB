"use client";

import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/hooks/useRedux";
import { logout } from "@/features/auth/authSlice";
import Button from "@/components/Button";

export default function ClientLogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = "session_token=; path=/; max-age=0; SameSite=Lax; Secure";
    router.push("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="!text-[#f92f16] !bg-white hover:!bg-[#f92f16] hover:!text-white active:!bg-[#f92f16] active:!text-white"
    >
      Logout
    </Button>
  );
}
