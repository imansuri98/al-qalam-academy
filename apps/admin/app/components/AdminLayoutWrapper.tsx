"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Target,
  FileText,
  Bookmark,
  Users,
  Search,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [session, setSession] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // If we're on login page, skip authentication check
    if (pathname === "/login") {
      setIsCheckingAuth(false);
      return;
    }

    // Check localStorage session
    const storedSession = localStorage.getItem("alarabi_admin_session");
    if (!storedSession) {
      router.push("/login");
    } else {
      try {
        setSession(JSON.parse(storedSession));
      } catch (e) {
        localStorage.removeItem("alarabi_admin_session");
        router.push("/login");
      }
    }
    setIsCheckingAuth(false);
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("alarabi_admin_session");
    router.push("/login");
  };

  // If on login page, render full clean view
  if (pathname === "/login") {
    return <div className="min-h-screen bg-claude-bg">{children}</div>;
  }

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-[#F8FAF6] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#C2410C] text-white font-arabic text-xl font-bold flex items-center justify-center mx-auto animate-pulse">
            ع
          </div>
          <p className="text-xs font-bold text-[#64748B]">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  const navigation = [
    { name: "Overview Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Course 1: Classical Grammar", href: "/courses/course-1", icon: BookOpen },
    { name: "Course 2: Spoken Arabic", href: "/courses/course-2", icon: MessageSquare },
    { name: "Exercise Builder Studio", href: "/lessons/new", icon: Target },
    { name: "Vocabulary & Native Audio", href: "/vocabulary/new", icon: FileText },
    { name: "Quran, Hadith & Passages", href: "/passages/new", icon: Bookmark },
    { name: "Admin Manager & RBAC", href: "/admins", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased flex">
      {/* Left Collapsible Admin Navigation Sidebar */}
      <aside
        className={`bg-white border-r border-[#E2E8F0] flex flex-col justify-between transition-all duration-200 z-20 ${
          isSidebarOpen ? "w-64" : "w-20"
        }`}
      >
        <div className="space-y-6 p-4">
          {/* Logo & Workspace Title */}
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <Link href="/" className="flex items-center gap-3 overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-[#C2410C] text-white font-arabic text-xl font-bold flex items-center justify-center shrink-0 shadow-xs">
                ع
              </div>
              {isSidebarOpen && (
                <div>
                  <h1 className="font-extrabold text-sm text-[#0F172A] tracking-tight">
                    Al-Arabi CMS
                  </h1>
                  <span className="text-[10px] font-bold text-[#C2410C] bg-[#FFF7ED] px-2 py-0.5 rounded border border-orange-200">
                    Content Ops Studio
                  </span>
                </div>
              )}
            </Link>
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-1 rounded-lg hover:bg-[#F8FAF6] text-[#64748B] text-xs"
            >
              {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                    isActive
                      ? "bg-[#C2410C] text-white shadow-xs"
                      : "text-[#475569] hover:bg-[#F8FAF6] hover:text-[#0F172A]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#64748B]"}`} />
                  {isSidebarOpen && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer Admin User Info & Logout */}
        <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAF6] space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                {session?.name ? session.name.substring(0, 2).toUpperCase() : "AD"}
              </div>
              {isSidebarOpen && (
                <div className="overflow-hidden text-xs">
                  <p className="font-extrabold text-[#0F172A] truncate">
                    {session?.name || "Super Admin"}
                  </p>
                  <p className="text-[10px] text-[#64748B] truncate">{session?.email || "admin@alarabi.com"}</p>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              title="Log Out of Admin Studio"
              className="p-1.5 rounded-lg hover:bg-rose-100 text-rose-600 transition-colors shrink-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Body */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="bg-white border-b border-[#E2E8F0] px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search curriculum levels, modules, lessons..."
                className="w-full pl-9 pr-4 py-1.5 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-xs text-[#0F172A] focus:outline-none focus:border-[#C2410C]"
              />
              <Search className="absolute left-3 top-2 w-3.5 h-3.5 text-[#64748B]" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200">
              ● Live CMS (Port 3001)
            </span>
            <a
              href="https://academy.alqalamlib.com"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] hover:border-[#C2410C] text-xs font-bold text-[#0F172A] transition-colors flex items-center gap-1.5"
            >
              <span>🌐 Learner Portal</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#64748B]" />
            </a>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
