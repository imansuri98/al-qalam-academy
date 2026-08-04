"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";
import { createClient } from "../utils/supabase/client";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/dashboard";

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ fullName?: string; email?: string; password?: string }>({});

  const validateForm = () => {
    const errs: { fullName?: string; email?: string; password?: string } = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name (minimum 2 characters).";
    }
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setAuthError(null);
    setSuccessMessage(null);

    const cleanEmail = email.trim();
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: fullName.trim(),
        },
      },
    });

    setLoading(false);

    if (error) {
      setAuthError(error.message);
      return;
    }

    if (data.session) {
      router.push(redirectUrl);
    } else {
      setSuccessMessage("Account created! Please check your email to confirm your sign up.");
    }
  };

  const handleOAuthSignUp = async (provider: "google" | "apple") => {
    setLoading(true);
    setAuthError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) {
      setAuthError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      <main className="max-w-md mx-auto px-6 pt-12 space-y-6">
        <div className="bg-white border border-[#E2E8F0] rounded-3xl p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#C2410C] text-white font-arabic text-2xl font-bold flex items-center justify-center mx-auto shadow-xs">
              ع
            </div>
            <h1 className="text-2xl font-extrabold text-[#0F172A]">Create Learner Account</h1>
            <p className="text-xs text-[#64748B]">
              Join Al-Arabi platform to study vowelled Classical Arabic.
            </p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
              {authError}
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold rounded-xl text-center">
              {successMessage}
            </div>
          )}

          {/* Social OAuth Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleOAuthSignUp("google")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#E2E8F0] bg-white hover:bg-slate-50 text-xs font-bold text-[#0F172A] transition-all shadow-2xs disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>

            <button
              type="button"
              onClick={() => handleOAuthSignUp("apple")}
              disabled={loading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#0F172A] bg-[#0F172A] hover:bg-black text-xs font-bold text-white transition-all shadow-2xs disabled:opacity-50"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.85.96-2.93-.93.04-2.07.62-2.74 1.4-.6.69-1.12 1.8-0.98 2.86 1.04.08 2.12-.55 2.76-1.33z" />
              </svg>
              Apple
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#E2E8F0] w-full"></div>
            <span className="bg-white px-3 text-[10px] uppercase font-bold text-[#64748B] tracking-wider absolute">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
                placeholder="Abdullah Omar"
                className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-semibold text-[#0F172A] focus:outline-none ${
                  errors.fullName ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                }`}
              />
              {errors.fullName && (
                <span className="text-[11px] font-bold text-rose-600 block">{errors.fullName}</span>
              )}
            </div>

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
                placeholder="student@alarabi.edu"
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
                placeholder="Create password (min 6 characters)..."
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
              disabled={loading}
              className="w-full py-3.5 brand-button font-bold text-xs rounded-xl transition-all shadow-2xs disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "🚀 Create Account & Start Learning"}
            </button>
          </form>

          <div className="pt-4 border-t border-[#E2E8F0] text-center text-xs text-[#64748B]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#C2410C] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
