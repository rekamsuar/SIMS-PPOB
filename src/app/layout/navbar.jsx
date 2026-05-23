"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

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
    <nav className="w-full border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/Logo.png"
              alt="logo"
              width={28}
              height={28}
              className="object-contain"
            />
            <h4 className="font-bold text-sm sm:text-base">SIMS PPOB</h4>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8 font-semibold">
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

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-gray-700"
        >
          {open ? (
            <HiX className="w-7 h-7" />
          ) : (
            <HiMenu className="w-7 h-7" />
          )}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-4">
          <div className="flex flex-col gap-4 font-semibold">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
      )}
    </nav>
  );
}