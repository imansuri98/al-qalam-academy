"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@alarabi.edu");
  const [password, setPassword] = useState("password123");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const errs: { email?: string; password?: string } = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    if (!password || password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      <main className="max-w-md mx-auto px-6 pt-16 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#C2410C] text-white font-arabic text-2xl font-bold flex items-center justify-center mx-auto shadow-xs">
              ع
            </div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Sign In to Al-Arabi</h1>
            <p className="text-xs text-[#64748B]">
              Resume your vowelled Classical Arabic studies and active streak.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
                className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-semibold text-[#0F172A] focus:outline-none ${
                  errors.email ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                }`}
              />
              {errors.email && (
                <span className="text-[11px] font-bold text-rose-600 block">{errors.email}</span>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
                }}
                className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-semibold text-[#0F172A] focus:outline-none ${
                  errors.password ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                }`}
              />
              {errors.password && (
                <span className="text-[11px] font-bold text-rose-600 block">{errors.password}</span>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 brand-button font-bold text-xs rounded-xl transition-all shadow-2xs"
            >
              🚀 Sign In & Open Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#C2410C] font-bold hover:underline">
              Create Learner Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
