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
    <main className="w-full max-w-screen-sm sm:max-w-screen-md lg:max-w-7xl mx-auto px-6 py-10">
      <section className="">
        <BalanceCard />
      </section>

      <section className="mb-16">
        <CategoryMenu />
      </section>

      <PromoSlider />
    </main>
  );
}
