"use client";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { fetchBalance } from "@/features/balance/balanceSlice";
import { getProfile } from "@/service/allService";
import thousandSeparator from "@/utils/thousandSeparator";

export default function BalanceCard() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.balance.balance);
  const balanceLoading = useAppSelector((state) => state.balance.loading);

  const [showBalance, setShowBalance] = useState(false);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    dispatch(fetchBalance());
  }, [dispatch]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setProfileLoading(true);
        const result = await getProfile();
        const fetched = result?.data;
        setProfile(fetched);
      } catch (err) {
        console.error(err?.message);
      } finally {
        setProfileLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const loading = balanceLoading || profileLoading;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
      <div className="">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
          {profile?.profile_image ? (
            <Image
              src={profile.profile_image}
              alt={profile.first_name}
              width={80}
              height={80}
            />
          ) : (
            <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500">
              <span className="text-sm">No Image</span>
            </div>
          )}
        </div>

        <span className="text-3xl text-gray-700 mb-2">Selamat datang,</span>

        <h1 className="text-5xl font-bold text-gray-900">
          {`${profile?.first_name || ""} ${profile?.last_name || ""}`}
        </h1>
      </div>
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
            {showBalance ? "Tutup Saldo" : "Lihat Saldo"}

            {showBalance ? <FaEye size={16} /> : <FaEyeSlash size={16} />}
          </button>
        </div>
      </div>
    </section>
  );
}
