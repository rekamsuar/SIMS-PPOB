"use client";
import BalanceCard from "@/components/homepage/balanceCard";
import { useEffect, useState } from "react";
import { formatCustomDate, formatDefaultDate } from "@/utils/formatDate";
import thousandSeparator from "@/utils/thousandSeparator";
import { getTransactionHistory } from "@/service/allService";

export default function Transaction() {
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
  const [records, setRecords] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const limit = 5;

  const fetchHistory = async (newOffset) => {
    try {
      setLoading(true);
      setError(null);
      const res = await getTransactionHistory({ offset: newOffset, limit });
      const payload = res?.data || {};
      const newRecords = payload.records || [];

      setRecords((prev) =>
        newOffset === 0 ? newRecords : [...prev, ...newRecords],
      );
      setOffset(newOffset);

      if (newRecords.length < limit) {
        setHasMore(false);
      }
    } catch (err) {
      setError(err?.message || "Gagal memuat riwayat transaksi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(0);
  }, []);

  const handleShowMore = () => {
    if (!loading && hasMore) {
      fetchHistory(offset + limit);
    }
  };

  const getTransactionDisplay = (type) => {
    if (type === "TOPUP") return { sign: "+", colorClass: "text-emerald-600" };
    return { sign: "-", colorClass: "text-red-500" };
  };

  return (
    <div>
      <div className="space-y-3">
        {error && <div className="text-center text-red-500 py-8">{error}</div>}

        {!error && records.length === 0 && !loading && (
          <div className="text-center text-gray-400 py-8">
            Maaf tidak ada histori transaksi saat ini
          </div>
        )}

        {records.map((history, index) => {
          const display = getTransactionDisplay(history.transaction_type);
          return (
            <div
              key={`${history.invoice_number}-${index}`}
              className="p-4 border rounded-md flex items-center justify-between bg-white"
            >
              <div>
                <div className={`text-sm ${display.colorClass} font-semibold`}>
                  {display.sign} Rp{thousandSeparator(history.total_amount)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {formatCustomDate(history.created_on)}
                </div>
              </div>
              <div className="text-sm text-gray-500">{history.description}</div>
            </div>
          );
        })}

        {loading && (
          <div className="text-center text-gray-400 py-4">Memuat...</div>
        )}
      </div>

      {hasMore && !loading && !error && (
        <div className="text-center mt-6">
          <button onClick={handleShowMore} className="text-sm text-[#f92f16]">
            Show more
          </button>
        </div>
      )}
    </div>
  );
}
