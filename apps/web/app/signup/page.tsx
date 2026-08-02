"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans antialiased pb-24">
      <LearnerNavbar />

      <main className="max-w-md mx-auto px-6 pt-12 space-y-6">
        <div className="bg-white border border-[#E8E2D9] rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#CC6B49] text-white font-arabic text-2xl font-bold flex items-center justify-center mx-auto shadow-sm">
              ع
            </div>
            <h1 className="text-2xl font-extrabold text-[#2C2825]">Create Learner Account</h1>
            <p className="text-xs text-[#8C827A]">
              Join Al-Arabi platform to study vowelled Modern Standard Arabic.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C827A] block mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Abdullah Omar"
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-semibold text-[#2C2825] focus:outline-none focus:border-[#CC6B49]"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C827A] block mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@alarabi.edu"
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
                placeholder="Create password..."
                className="w-full p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D9] text-xs font-semibold text-[#2C2825] focus:outline-none focus:border-[#CC6B49]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#CC6B49] hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              🚀 Create Account & Start Learning
            </button>
          </form>

          <div className="pt-4 border-t border-[#E8E2D9] text-center text-xs text-[#8C827A]">
            Already have an account?{" "}
            <Link href="/login" className="text-[#CC6B49] font-bold hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
