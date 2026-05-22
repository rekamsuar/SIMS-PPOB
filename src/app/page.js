import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientLogoutButton from '@/components/ClientLogoutButton';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token');

  // If no session token, redirect to login
  if (!token) {
    redirect('/login');
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans p-8 text-black">
      <div className="w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-sm space-y-6 text-center">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Selamat Datang!
          </h1>
          <div className="h-1 w-16 bg-[#f92f16] rounded-full mt-2" />
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed">
          Anda berhasil masuk ke dashboard **SIMS PPOB**. Sesi Anda telah disimpan dengan aman di cookies.
        </p>

        <div className="pt-2">
          <ClientLogoutButton />
        </div>
      </div>
    </div>
  );
}
