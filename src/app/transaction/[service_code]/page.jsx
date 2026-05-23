"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BalanceCard from "@/components/homepage/balanceCard";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Toast from "@/components/Toast";
import Modal from "@/components/Modal";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { BsBadgeCc } from "react-icons/bs";
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalStage, setModalStage] = useState("confirm");
  const [modalMessage, setModalMessage] = useState("");

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
    setModalStage("confirm");
    setModalMessage(`Pembayaran ${service?.service_name || service_code} sebesar Rp${thousandSeparator(Number(amount))} ?`);
    setModalOpen(true);
  };

  const confirmTransaction = async () => {
    setModalStage("processing");
    try {
      const payload = {
        service_code: String(service_code).toUpperCase(),
        total_amount: Number(amount),
      };
      const res = await transaction(payload);

      if (res?.status === 0) {
        setModalStage("success");
        setModalMessage(res.message || `Pembayaran sebesar Rp${thousandSeparator(Number(amount))} berhasil`);
        dispatch(fetchBalance());
        setAmount("");
      } else {
        setModalStage("error");
        setModalMessage(res?.message || "Transaksi gagal.");
      }
    } catch (err) {
      setModalStage("error");
      setModalMessage(err?.message || "Gagal melakukan transaksi.");
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
            icon={<BsBadgeCc className="w-5 h-5" />}
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

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          {modalStage === "confirm" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-[#f92f16] text-white flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none"><path d="M12 2L12 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
              <p className="text-sm text-gray-600">{modalMessage}</p>
              <div className="mt-6 grid gap-3">
                <Button onClick={confirmTransaction} className="!bg-[#f92f16]">Ya, lanjutkan Bayar</Button>
                <button onClick={() => setModalOpen(false)} className="text-sm text-gray-400">Batalkan</button>
              </div>
            </div>
          )}

          {modalStage === "processing" && (
            <div className="text-center">
              <div className="mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center mx-auto">
                  <svg className="w-6 h-6 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#d1d5db" strokeWidth="4" strokeLinecap="round"/></svg>
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
                <button onClick={() => setModalOpen(false)} className="text-sm text-[#f92f16]">Kembali ke Beranda</button>
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
                <button onClick={() => setModalOpen(false)} className="text-sm text-[#f92f16]">Kembali ke Beranda</button>
              </div>
            </div>
          )}
        </Modal>
      </section>
    </main>
  );
}
