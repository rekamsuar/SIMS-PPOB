'use client';

import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/hooks/useRedux';
import { logout } from '@/features/auth/authSlice';
import Button from '@/components/Button';

export default function ClientLogoutButton() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    document.cookie = 'session_token=; path=/; max-age=0; SameSite=Lax; Secure';
    router.push('/login');
  };

  return (
    <Button onClick={handleLogout} className="!bg-gray-800 hover:!bg-gray-950 active:!bg-black">
      Keluar (Logout)
    </Button>
  );
}
