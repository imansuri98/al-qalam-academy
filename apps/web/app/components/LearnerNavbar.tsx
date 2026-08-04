"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Flame, Mail, Home, ArrowRight, LogOut, User } from "lucide-react";
import { createClient } from "../utils/supabase/client";

export default function LearnerNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    ...(user ? [{ name: "Dashboard", href: "/dashboard", icon: Flame }] : []),
    { name: "Contact", href: "/contact", icon: Mail },
  ];

  return (
    <header className="sticky top-4 z-40 px-4 md:px-8 max-w-6xl mx-auto mb-6">
      <div className="glass-nav rounded-2xl px-6 py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#C2410C] text-white font-arabic text-xl font-bold flex items-center justify-center shadow-xs">
            ع
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-[#0F172A]">
                Al-Arabi
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md brand-badge">
                Academy
              </span>
            </div>
          </div>
        </Link>

        {/* Clean World-Class Typography Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 transition-colors relative py-1 ${
                  isActive
                    ? "text-[#C2410C] font-extrabold"
                    : "text-[#475569] hover:text-[#0F172A]"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#C2410C]" : "text-[#64748B]"}`} />
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C2410C] rounded-full"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Dynamic based on Auth state */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#0F172A] bg-[#F8FAF6] border border-[#E2E8F0] px-3 py-1.5 rounded-xl">
                <User className="w-3.5 h-3.5 text-[#C2410C]" />
                <span className="max-w-[120px] truncate">{user.user_metadata?.full_name || user.email}</span>
              </span>

              <button
                onClick={handleSignOut}
                className="px-3.5 py-2 rounded-xl bg-white border border-[#E2E8F0] hover:border-rose-300 hover:text-rose-600 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer text-[#475569]"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-xs"
            >
              <span>Sign In</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
