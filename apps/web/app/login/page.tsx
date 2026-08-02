"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("student@alarabi.edu");
  const [password, setPassword] = useState("••••••••");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans antialiased pb-24">
      <LearnerNavbar />

      <main className="max-w-md mx-auto px-6 pt-16 space-y-6">
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#CC6B49] text-white font-arabic text-2xl font-bold flex items-center justify-center mx-auto shadow-sm">
              ع
            </div>
            <h1 className="text-2xl font-extrabold text-[#2C2825]">Sign In to Al-Arabi</h1>
            <p className="text-xs text-[#8C827A]">
              Resume your vowelled Arabic studies and active streak.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C827A] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-semibold text-[#2C2825] focus:outline-none focus:border-[#CC6B49]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C827A] block mb-1">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-semibold text-[#2C2825] focus:outline-none focus:border-[#CC6B49]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#CC6B49] hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              🚀 Sign In & Open Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-[#E8E2D9] text-center text-xs text-[#8C827A]">
            Don't have an account?{" "}
            <Link href="/signup" className="text-[#CC6B49] font-bold hover:underline">
              Create Learner Account
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
