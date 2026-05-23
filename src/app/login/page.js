"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdLockOutline, MdOutlineAlternateEmail } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { loginUser, clearError } from "@/features/auth/authSlice";
import FormInput from "@/components/FormInput";
import Button from "@/components/Button";
import Toast from "@/components/Toast";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    loading,
    error: authError,
    token,
  } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toast, setToast] = useState({ message: "", type: "error" });

  useEffect(() => {
    if (authError) {
      setToast({ message: authError, type: "error" });
    }
  }, [authError]);

  useEffect(() => {
    if (token) {
      document.cookie = `session_token=${token}; path=/; max-age=${
        60 * 60 * 24 * 7
      }; SameSite=Lax; Secure`;

      setToast({ message: "Login Sukses! Mengalihkan...", type: "success" });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    }
  }, [token, router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (authError) dispatch(clearError());
    if (toast.message) setToast({ message: "", type: "error" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setToast({ message: "", type: "error" });
    dispatch(clearError());

    const { email, password } = formData;

    if (!email || !password) {
      setToast({ message: "Email dan password wajib diisi", type: "error" });
      return;
    }

    if (!emailRegex.test(email)) {
      setToast({ message: "Format email tidak valid", type: "error" });
      return;
    }

    if (password.length < 8) {
      setToast({ message: "Password minimal 8 karakter", type: "error" });
      return;
    }

    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="flex min-h-screen bg-white font-sans text-black">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 xl:px-32 relative">
        <div className="w-full max-w-[420px] mx-auto py-12 flex flex-col justify-between min-h-[85vh]">
          <div />

          <div className="space-y-8 my-auto">
            <div className="flex flex-col items-center justify-center text-center space-y-10">
              <div className="flex items-center gap-2">
                <div className="relative w-7 h-7 flex items-center justify-center">
                  <Image
                    src="/assets/Logo.png"
                    alt="SIMS PPOB Logo"
                    width={28}
                    height={28}
                    className="object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-gray-900">
                  SIMS PPOB
                </h3>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                Masuk atau buat akun <br /> untuk memulai
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <FormInput
                type="email"
                name="email"
                placeholder="masukan email anda"
                icon={<MdOutlineAlternateEmail className="w-5 h-5" />}
                value={formData.email}
                onChange={handleChange}
                required
              />

              <FormInput
                type="password"
                name="password"
                placeholder="masukan password anda"
                icon={<MdLockOutline className="w-5 h-5" />}
                value={formData.password}
                onChange={handleChange}
                required
              />

              <div className="pt-3">
                <Button
                  type="submit"
                  loading={loading}
                  className="cursor-pointer"
                >
                  Masuk
                </Button>
              </div>
            </form>

            <div className="text-center text-sm text-gray-500">
              belum punya akun? registrasi{" "}
              <Link
                href="/register"
                className="text-[#f92f16] font-bold hover:underline"
              >
                di sini
              </Link>
            </div>
          </div>

          <div className="w-full flex justify-center pt-8">
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast({ message: "", type: "error" })}
            />
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-[#fff1f0] items-center justify-center p-12 relative overflow-hidden select-none">
        <div className="flex items-center justify-center animate-pulse-slow">
          <Image
            src="/assets/Illustrasi Login.png"
            alt="Illustrasi Login SIMS PPOB"
            fill
            priority
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
