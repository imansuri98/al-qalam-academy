"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem("alarabi_admin_session");
    if (existing) {
      router.push("/");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (data.success && data.session) {
        localStorage.setItem("alarabi_admin_session", JSON.stringify(data.session));
        router.push("/");
      } else {
        setError(data.error || "Invalid credentials.");
      }
    } catch (err: any) {
      setIsLoading(false);
      setError("Server error during login. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-claude-bg flex items-center justify-center p-6 text-claude-textMain claude-warm-glow">
      <div className="w-full max-w-md space-y-6">
        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-claude-terracotta text-white font-arabic text-3xl font-bold flex items-center justify-center mx-auto shadow-md">
            ع
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-claude-textMain">
            Al-Arabi CMS Studio
          </h1>
          <p className="text-xs text-claude-textMuted">
            Sign in to manage Fusha & Grammar courses, exercises, and admin permissions.
          </p>
        </div>

        {/* Clean Login Form (No Credentials Displayed) */}
        <form onSubmit={handleLogin} className="claude-card rounded-2xl p-6 space-y-5">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-semibold">
              ❌ {error}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-claude-textMain block mb-1">
              Username / Email Address
            </label>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username or Email"
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-xs focus:outline-none focus:border-claude-terracotta font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-claude-textMain block mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-xs focus:outline-none focus:border-claude-terracotta font-medium"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-md disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Sign In to CMS Studio"}
          </button>
        </form>
      </div>
    </div>
  );
}
