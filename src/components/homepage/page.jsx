import Image from "next/image";
import BalanceCard from "@/components/homepage/balanceCard";
import CategoryMenu from "@/components/homepage/categoryMenu";
import PromoSlider from "@/components/homepage/sliderBanner";

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-14">
        <div>
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4">
            <Image
              src="/assets/profile.png"
              alt="profile"
              width={80}
              height={80}
            />
          </div>

          <p className="text-3xl text-gray-700 mb-2">Selamat datang,</p>

          <h1 className="text-5xl font-bold text-gray-900">Kristanto Wibowo</h1>
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
