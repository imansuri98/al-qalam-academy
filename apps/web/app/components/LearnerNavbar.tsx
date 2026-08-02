"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Flame, Mail, Home, ArrowRight } from "lucide-react";

export default function LearnerNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "Dashboard", href: "/dashboard", icon: Flame },
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

        {/* Action Button */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="px-4 py-2 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <span>Sign In</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
