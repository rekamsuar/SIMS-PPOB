import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo.png" alt="logo" width={28} height={28} />
            <h1 className="font-bold text-lg text-gray-800">SIMS PPOB</h1>
          </div>
        </Link>

        <div className="flex items-center gap-10 text-gray-700 font-semibold active:text-[#f92f16]">
          <Link href="/topup">Top Up</Link>
          <Link href="/transaction">Transaction</Link>
          <Link href="/profile">Akun</Link>
        </div>
      </div>
    </nav>
  );
}
