"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BalanceCard from "@/components/homepage/balanceCard";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { transaction, getServices } from "@/service/allService";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchBalance } from "@/features/balance/balanceSlice";
import thousandSeparator from "@/utils/thousandSeparator";
import Image from "next/image";

export default function TransactionPage() {
  const { service_code } = useParams();
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState("");
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingService, setFetchingService] = useState(true);
  const [toast, setToast] = useState({ message: "", type: "success" });

  useEffect(() => {
    const fetchService = async () => {
      try {
        setFetchingService(true);
        const res = await getServices();
        if (res?.status === 0 && Array.isArray(res.data)) {
          const found = res.data.find(
            (s) =>
              s.service_code?.toLowerCase() ===
              String(service_code).toLowerCase()
          );
          setService(found || null);
        }
      } catch (err) {
        console.error(err?.message);
      } finally {
        setFetchingService(false);
      }
    };

    if (service_code) {
      fetchService();
    }
  }, [service_code]);

  const onChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setAmount(raw);
  };

  const isValid = () => {
    const n = Number(amount || 0);
    return n > 0;
  };

  const handleTransaction = async () => {
    if (!isValid() || !service_code) return;
    setLoading(true);
    try {
      const payload = {
        service_code: String(service_code).toUpperCase(),
        total_amount: Number(amount),
      };
      const res = await transaction(payload);

      if (res?.status === 0) {
        setToast({
          message: res.message || "Transaksi berhasil",
          type: "success",
        });
        dispatch(fetchBalance());
        setAmount("");
      } else {
        setToast({
          message: res?.message || "Transaksi gagal.",
          type: "error",
        });
      }
    } catch (err) {
      setToast({
        message: err?.message || "Gagal melakukan transaksi.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="w-full">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <BalanceCard />
      </section>

      <section className="max-w-7xl mx-auto px-6 py-6">
        <div className="mb-6">
          <span className="text-sm text-gray-600">Pembayaran</span>
          <div className="flex items-center gap-3 mt-1">
            {service?.service_icon ? (
              <Image
                src={service.service_icon}
                alt={service.service_name || service_code}
                className=""
                width={35} height={35}
              />
            ) : fetchingService ? (
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" />
            ) : null}
            <span className="text-2xl font-semibold capitalize">
              {service?.service_name || service_code}
            </span>
          </div>
        </div>

        <div className="">
          <FormInput
            name="amount"
            placeholder="masukan nominal"
            value={amount}
            onChange={onChange}
          />

          <div className="mt-4">
            <Button
              onClick={handleTransaction}
              disabled={!isValid()}
              loading={loading}
            >
              Bayar
            </Button>
          </div>
        </div>

        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ message: "", type: "success" })}
          />
        </div>
      </section>
    </main>
  );
}
