"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("super@alarabi.com");
  const [password, setPassword] = useState("superpass");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      // Authenticate against demo admin credentials & set role
      if (email === "super@alarabi.com" && password === "superpass") {
        const session = {
          email: "super@alarabi.com",
          name: "Head Super Admin",
          role: "SUPER_ADMIN",
        };
        localStorage.setItem("alarabi_admin_session", JSON.stringify(session));
        router.push("/");
      } else if (email === "admin@alarabi.com" && password === "adminpass") {
        const session = {
          email: "admin@alarabi.com",
          name: "Content Creator Admin",
          role: "ADMIN",
        };
        localStorage.setItem("alarabi_admin_session", JSON.stringify(session));
        router.push("/");
      } else {
        setError("Invalid email or password. Use demo credentials below.");
      }
    }, 600);
  };

  const fillQuickCredentials = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
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

        {/* Login Form */}
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
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@alarabi.com"
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-xs focus:outline-none focus:border-claude-terracotta"
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
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-xs focus:outline-none focus:border-claude-terracotta"
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

        {/* Quick Credentials Sandbox Selector */}
        <div className="p-4 rounded-2xl bg-white border border-claude-border space-y-3 text-xs shadow-sm">
          <span className="font-bold text-claude-textMain block border-b border-claude-border pb-2">
            🔑 Demo Role Credentials (Click to Autofill):
          </span>

          <div className="space-y-2">
            <button
              onClick={() => fillQuickCredentials("super@alarabi.com", "superpass")}
              className="w-full p-2.5 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-950 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold block">👑 Super Admin</span>
                <span className="text-[10px] text-purple-800">super@alarabi.com / superpass</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-200 text-purple-900">
                Full + Admin Management
              </span>
            </button>

            <button
              onClick={() => fillQuickCredentials("admin@alarabi.com", "adminpass")}
              className="w-full p-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-950 text-left transition-colors flex items-center justify-between"
            >
              <div>
                <span className="font-bold block">👤 Standard Content Admin</span>
                <span className="text-[10px] text-amber-800">admin@alarabi.com / adminpass</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-200 text-amber-900">
                Content Creation Only
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
