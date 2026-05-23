"use client";

import React, { useState } from "react";
import BalanceCard from "@/components/homepage/balanceCard";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import { BsBadgeCc } from "react-icons/bs";
import thousandSeparator from "@/utils/thousandSeparator";
import { topup as topupApi } from "@/service/allService";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchBalance, setBalance } from "@/features/balance/balanceSlice";

export default function Topup() {
  const suggestions = [10000, 20000, 50000, 100000, 250000, 500000];
  const MIN = 10000;
  const MAX = 1000000;

  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const onSelect = (val) => {
    setSelected(val);
    setAmount(String(val));
  };

  const onChange = (e) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setAmount(raw);
    setSelected(null);
  };

  const isValid = () => {
    const n = Number(amount || 0);
    return n >= MIN && n <= MAX;
  };

  const handleTopup = async () => {
    if (!isValid()) return;
    setLoading(true);
    try {
      const payload = { top_up_amount: Number(amount) };
      const res = await topupApi(payload);

      if (res?.status === 0) {
        setToast({
          message: res.message || "Top Up Balance berhasil",
          type: "success",
        });
        dispatch(setBalance(res.data?.balance ?? 0));
        dispatch(fetchBalance());
        setSelected(null);
        setAmount("");
      } else {
        setToast({
          message: res?.message || "Gagal melakukan top up.",
          type: "error",
        });
      }
    } catch (err) {
      setToast({
        message: err?.message || "Gagal melakukan top up.",
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
          <span className="text-sm text-gray-600">Silahkan masukan</span>
          <h2 className="text-2xl font-semibold">Nominal Top Up</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
          <div className="lg:col-span-2 space-y-4">
            <FormInput
              name="topup"
              placeholder="masukan nominal Top Up"
              icon={<BsBadgeCc className="w-5 h-5" />}
              value={amount}
              onChange={onChange}
            />

            <Button
              onClick={handleTopup}
              disabled={!isValid()}
              loading={loading}
            >
              Top Up
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSelect(s)}
                className={`border rounded px-3 py-2 text-sm text-gray-700 hover:shadow-sm transition ${
                  selected === s
                    ? "bg-white border-[#f92f16] text-[#f92f16] font-semibold"
                    : "bg-white"
                }`}
              >
                Rp{thousandSeparator(s)}
              </button>
            ))}
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
