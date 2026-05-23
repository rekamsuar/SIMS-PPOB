"use client";
import Image from "next/image";
import BalanceCard from "@/components/homepage/balanceCard";
import { getProfile } from "@/service/allService";
import { useEffect, useState } from "react";
import { formatDefaultDate } from "@/utils/formatDate";
import thousandSeparator from "@/utils/thousandSeparator";

export default function Transaction() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const result = await getProfile();
        const fetched = result?.data;
        setProfile(fetched);
      } catch (err) {
        setError(err?.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  return (
    <main className="w-full">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <BalanceCard />
      </section>
      <section className="max-w-7xl mx-auto px-6 py-6">
        <h3 className="text-lg font-semibold mb-4">Semua Transaksi</h3>

        <TransactionList />
      </section>
    </main>
  );
}

function TransactionList() {
  const months = [
    "Semua",
    "Maret",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
  ];

  const [selected, setSelected] = useState("Semua");

  // hardcoded sample transactions
  const transactions = [
    { id: 1, type: "credit", amount: 10000, date: "2023-08-17 13:10:00", title: "Top Up Saldo" },
    { id: 2, type: "debit", amount: 40000, date: "2023-08-17 12:10:00", title: "Pulsa Prabayar" },
    { id: 3, type: "debit", amount: 10000, date: "2023-07-17 11:10:00", title: "Listrik Pascabayar" },
    { id: 4, type: "credit", amount: 50000, date: "2023-06-17 10:10:00", title: "Top Up Saldo" },
    { id: 5, type: "credit", amount: 50000, date: "2023-05-17 09:10:00", title: "Top Up Saldo" },
  ];

  const visible =
    selected === "Semua"
      ? transactions
      : transactions.filter((t) => {
          // naive month match based on month name in Indonesian
          const m = new Date(t.date).toLocaleString("id-ID", { month: "long" });
          return m.toLowerCase().startsWith(selected.toLowerCase());
        });

  return (
    <div>
      <div className="flex gap-4 mb-6 text-sm">
        {months.map((m) => (
          <button
            key={m}
            onClick={() => setSelected(m)}
            className={`px-2 py-1 rounded-md transition-colors ${selected === m ? 'text-gray-800 font-semibold' : 'text-gray-400'}`}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {visible.length === 0 && (
          <div className="text-center text-gray-400 py-8">Maaf tidak ada histori transaksi saat ini</div>
        )}

        {visible.map((t) => (
          <div key={t.id} className="p-4 border rounded-md flex items-center justify-between bg-white">
            <div>
              <div className={`text-sm ${t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'} font-semibold`}>
                {t.type === 'credit' ? '+' : '-'} Rp{thousandSeparator(t.amount)}
              </div>
              <div className="text-xs text-gray-400 mt-1">{formatDefaultDate(t.date)}</div>
            </div>

            <div className="text-sm text-gray-500">{t.title}</div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <button className="text-sm text-[#f92f16]">Show more</button>
      </div>
    </div>
  );
}
