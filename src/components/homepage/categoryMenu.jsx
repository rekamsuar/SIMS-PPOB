"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { getServices } from "@/service/allService";
import Link from "next/link";

export default function CategoryMenu() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const result = await getServices();
        if (result && Array.isArray(result.data)) {
          setServices(result.data);
        } else {
          setServices([]);
        }
      } catch (err) {
        setError(err?.message || "Gagal memuat layanan");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-6">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            <div className="w-16 h-16 rounded-2xl bg-gray-200 animate-pulse" />
            <div className="w-16 h-4 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-10">
      {services.map((item) => (
        <div
          key={item.service_code}
          className="flex flex-col items-center gap-3 cursor-pointer group"
        >
          <Link href={`/transaction/${encodeURIComponent(item.service_code.toLowerCase())}`}>
            <div className="w-25 h-25 rounded-2xl flex items-center justify-center transition group-hover:scale-105">
              <Image
                src={item.service_icon}
                alt={item.service_name}
                width={32}
                height={32}
                className="object-contain"
                unoptimized
              />
            </div>

            <p className="text-sm text-center text-gray-700">
              {item.service_name}
            </p>
          </Link>
        </div>
      ))}
    </section>
  );
}
