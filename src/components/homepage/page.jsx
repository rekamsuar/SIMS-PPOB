"use client";
import Image from "next/image";
import BalanceCard from "@/components/homepage/balanceCard";
import CategoryMenu from "@/components/homepage/categoryMenu";
import PromoSlider from "@/components/homepage/sliderBanner";
import { getProfile } from "@/service/allService";
import { useEffect, useState } from "react";

export default function HomePage() {
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
    <main className="max-w-7xl mx-auto px-6 py-10">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
            {profile?.profile_image ? (
              <Image
                src={profile.profile_image}
                alt="profile"
                width={80}
                height={80}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-gray-500">
                <span className="text-sm">No Image</span>
              </div>
            )}
          </div>

          <p className="text-3xl text-gray-700 mb-2">Selamat datang,</p>

          <h1 className="text-5xl font-bold text-gray-900">
            {`${profile?.first_name || ""} ${profile?.last_name || ""}`}
          </h1>
        </div>

        <BalanceCard />
      </section>

      <section className="mb-16">
        <CategoryMenu />
      </section>

      <PromoSlider />
    </main>
  );
}
