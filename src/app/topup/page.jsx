"use client";

import React, { useState } from "react";
import BalanceCard from "@/components/homepage/balanceCard";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsBadgeCc } from "react-icons/bs";
import thousandSeparator from "@/utils/thousandSeparator";
import { topup as topupApi } from "@/service/allService";
import { useAppDispatch } from "@/hooks/useRedux";
import { fetchBalance, setBalance } from "@/features/balance/balanceSlice";
import { FaCheck } from "react-icons/fa6";
import Image from "next/image";

export default function Topup() {
  const suggestions = [10000, 20000, 50000, 100000, 250000, 500000];
  const MIN = 10000;
  const MAX = 1000000;

  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState("confirm");
  const [modalMessage, setModalMessage] = useState("");

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
    setModalStage("confirm");
    setModalMessage(` Rp${thousandSeparator(Number(amount))}?`);
    setModalOpen(true);
  };

  const confirmTopup = async () => {
    setModalStage("processing");
    try {
      const payload = { top_up_amount: Number(amount) };
      const res = await topupApi(payload);
      setModalStage("success");
      setModalMessage(
        res?.message || ` Rp${thousandSeparator(Number(amount))} berhasil`,
      );
      setSelected(null);
      setAmount("");
    } catch (err) {
      setModalStage("error");
      setModalMessage(
        err?.message ||
          `Gagal melakukan top up sebesar Rp${thousandSeparator(Number(amount))}`,
      );
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
        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          {modalStage === "confirm" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full text-white flex items-center justify-center mx-auto">
                  <Image src="/assets/Logo.png" width={35} height={35} />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Anda yakin untuk Top Up sebesar
              </p>
              <span className="font-bold text-xl">{modalMessage}</span>
              <div className="mt-6 grid gap-3">
                <button
                  onClick={confirmTopup}
                  className="text-sm text-[#f92f16] font-semibold"
                >
                  Ya, lanjutkan Top Up
                </button>
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-sm text-gray-400 font-semibold"
                >
                  Batalkan
                </button>
              </div>
            </div>
          )}

          {modalStage === "processing" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mx-auto">
                  <span className="bg-"><FaCheck /></span>
                </div>
              </div>
              <p className="text-sm text-gray-600">Memproses pembayaran...</p>
            </div>
          )}

          {modalStage === "success" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <FaCheckCircle className="w-6 h-6" />
                </div>
              </div>
              <p className="font-semibold">{modalMessage}</p>
              <div className="mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-sm text-[#f92f16]"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          )}

          {modalStage === "error" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto">
                  <FaTimesCircle className="w-6 h-6" />
                </div>
              </div>
              <p className="font-semibold">{modalMessage}</p>
              <div className="mt-6">
                <button
                  onClick={() => setModalOpen(false)}
                  className="text-sm text-[#f92f16]"
                >
                  Kembali ke Beranda
                </button>
              </div>
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
}
