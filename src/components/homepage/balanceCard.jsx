"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function balanceCard() {
  const [showBalance, setShowBalance] = useState(false);

  const balance = 1250000;

  return (
    <div className="relative bg-[#F42619] rounded-3xl p-8 text-white overflow-hidden min-h-[190px]">
      <div className="absolute right-0 top-0 h-full w-[250px] opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,white_1px,transparent_1px)] bg-[length:25px_25px]" />
      </div>

      <div className="relative z-10">
        <p className="text-lg mb-3">Saldo anda</p>

        <h2 className="text-4xl font-bold mb-6">
          Rp {showBalance ? balance.toLocaleString("id-ID") : "•••••••"}
        </h2>

        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center gap-2 text-sm"
        >
          {showBalance ? "Sembunyikan Saldo" : "Lihat Saldo"}

          {showBalance ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
        </button>
      </div>
    </div>
  );
}
