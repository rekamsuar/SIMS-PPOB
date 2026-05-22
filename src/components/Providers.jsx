'use client';

import { Provider } from 'react-redux';
import { store } from '@/store';
import { setLogoutHandler } from '@/service/apiClientService';
import { logout } from '@/features/auth/authSlice';

setLogoutHandler(() => {
  store.dispatch(logout());
  document.cookie = 'session_token=; path=/; max-age=0; SameSite=Lax; Secure';
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
});

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
