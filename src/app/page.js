import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ClientLogoutButton from '@/components/ClientLogoutButton';
import Navbar from './layout/navbar';
import HomePage from '@/components/homepage/page';

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get('session_token');

  if (!token) {
    redirect('/login');
  }

  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
