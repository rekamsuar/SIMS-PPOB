"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getBanners } from "@/service/allService";

export default function SliderBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const result = await getBanners();
        if (result && Array.isArray(result.data)) {
          setBanners(result.data);
        } else {
          setBanners([]);
        }
      } catch (err) {
        setError(err?.message || "Gagal memuat banner");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Temukan promo menarik
        </h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="min-w-[320px] h-[160px] rounded-2xl bg-gray-200 animate-pulse snap-start"
            />
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Temukan promo menarik
        </h2>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Temukan promo menarik
      </h2>

      <div className="flex gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-3">
        {banners.map((banner, index) => (
          <div
            key={index}
            className="min-w-[320px] h-[160px] rounded-2xl overflow-hidden relative p-6 text-white bg-gradient-to-r from-red-500 to-pink-500 snap-start flex justify-between"
          >
            <div className="max-w-[170px] z-10">
              <h3 className="font-bold text-2xl mb-2">{banner.banner_name}</h3>
              <p className="text-sm opacity-90">{banner.description}</p>
            </div>

            <div className="absolute right-0 bottom-0">
              <Image
                src={banner.banner_image}
                alt={banner.banner_name}
                width={180}
                height={180}
                className="object-contain"
                unoptimized
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
