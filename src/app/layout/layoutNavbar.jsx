"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/app/layout/navbar";

export default function ClientNavbar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/login") || pathname?.startsWith("/register"))
    return null;
  return <Navbar />;
}
