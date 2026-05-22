'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaEnvelope, FaUser, FaLock } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import { registerUser, clearError } from '@/features/auth/authSlice';
import FormInput from '@/components/FormInput';
import Button from '@/components/Button';
import Toast from '@/components/Toast';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error: authError } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    password: '',
    confirm_password: '',
  });
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ message: '', type: 'error' });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (authError) {
      setToast({ message: authError, type: 'error' });
    }
  }, [authError]);

  useEffect(() => {
    if (success) {
      setToast({ message: 'Registrasi sukses! Mengalihkan ke login...', type: 'success' });
      const timer = setTimeout(() => {
        router.push('/login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [success, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
    if (authError) dispatch(clearError());
    if (toast.message) setToast({ message: '', type: 'error' });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrors({});
    setToast({ message: '', type: 'error' });
    setSuccess(false);
    dispatch(clearError());

    const { email, first_name, last_name, password, confirm_password } = formData;

    if (!email || !first_name || !last_name || !password || !confirm_password) {
      setToast({ message: 'Semua field wajib diisi sebelum melakukan registrasi', type: 'error' });
      return;
    }

    if (!emailRegex.test(email)) {
      setToast({ message: 'Format email tidak valid', type: 'error' });
      return;
    }

    if (password.length < 8) {
      setToast({ message: 'Password minimal 8 karakter', type: 'error' });
      return;
    }

    if (password !== confirm_password) {
      setErrors({ confirm_password: 'password tidak sama' });
      setToast({ message: 'Konfirmasi password tidak cocok', type: 'error' });
      return;
    }

    const resultAction = await dispatch(registerUser({ email, first_name, last_name, password }));
    if (registerUser.fulfilled.match(resultAction)) {
      if (resultAction.payload.status === 0) {
        setFormData({
          email: '',
          first_name: '',
          last_name: '',
          password: '',
          confirm_password: '',
        });
        setSuccess(true);
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-black">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-[420px] mx-auto py-12 flex flex-col justify-between min-h-[85vh]">
          <div />

          <div className="space-y-8 my-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/assets/Logo.png"
                    alt="SIMS PPOB Logo"
                    width={28}
                    height={28}
                    className="object-contain"
                  />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-gray-900">
                  SIMS PPOB
                </h1>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                Lengkapi data untuk <br /> membuat akun
              </h2>
            </div>

            <form onSubmit={handleRegister} className="space-y-5">
              <FormInput
                type="email"
                name="email"
                placeholder="masukan email anda"
                icon={<FaEnvelope className="w-5 h-5" />}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormInput
                type="text"
                name="first_name"
                placeholder="nama depan"
                icon={<FaUser className="w-5 h-5" />}
                value={formData.first_name}
                onChange={handleChange}
                required
              />

              <FormInput
                type="text"
                name="last_name"
                placeholder="nama belakang"
                icon={<FaUser className="w-5 h-5" />}
                value={formData.last_name}
                onChange={handleChange}
                required
              />

              <FormInput
                type="password"
                name="password"
                placeholder="buat password"
                icon={<FaLock className="w-5 h-5" />}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <FormInput
                type="password"
                name="confirm_password"
                placeholder="konfirmasi password"
                icon={<FaLock className="w-5 h-5" />}
                value={formData.confirm_password}
                onChange={handleChange}
                error={errors.confirm_password}
                required
              />

              <div className="pt-3">
                <Button type="submit" loading={loading}>
                  Registrasi
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-500">
              sudah punya akun? login{' '}
              <Link href="/login" className="text-[#f92f16] font-bold hover:underline">
                di sini
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center pt-8">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ message: '', type: 'error' })}
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-[#fff1f0] items-center justify-center p-12 relative overflow-hidden select-none">
        <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center animate-pulse-slow">
          <Image
            src="/assets/Illustrasi Login.png"
            alt="Illustrasi Register SIMS PPOB"
            fill
            priority
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
