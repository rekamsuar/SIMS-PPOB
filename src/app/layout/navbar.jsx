"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const navItems = [
    {
      label: "Top Up",
      href: "/topup",
    },
    {
      label: "Transaction",
      href: "/transaction",
    },
    {
      label: "Akun",
      href: "/profile",
    },
  ];

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex justify-center items-center gap-2">
            <Image src="/assets/logo.png" alt="logo" width={28} height={28} />
            <h4 className="font-bold">SIMS PPOB</h4>
          </div>
        </Link>

        <div className="flex items-center gap-10 font-semibold">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  isActive
                    ? "text-[#f92f16]"
                    : "text-gray-700 hover:text-[#f92f16]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
