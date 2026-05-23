"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getBalance } from "@/service/allService";
import thousandSeparator from "@/utils/thousandSeparator";

export default function balanceCard() {
  const [balance, setBalance] = useState({});
  const [showBalance, setShowBalance] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        setLoading(true);
        const result = await getBalance();
        const fetched = result?.data?.balance;
        setBalance(fetched);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBalance();
  }, []);

  return (
    <div className="relative bg-[#F42619] rounded-3xl p-8 text-white overflow-hidden min-h-[190px]">
      <div className="absolute right-0 top-0 h-full w-[250px] opacity-30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,white_1px,transparent_1px)] bg-[length:25px_25px]" />
      </div>

      <div className="relative z-10">
        <p className="text-lg mb-3">Saldo anda</p>

        <h2 className="text-4xl font-bold mb-6">
          {loading
            ? "Memuat..."
            : `Rp ${showBalance ? thousandSeparator(balance) : "•••••••"}`}
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
