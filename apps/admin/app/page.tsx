"use client";

import React from "react";
import Link from "next/link";
import {
  BookOpen,
  MessageSquare,
  FileText,
  Users,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

export default function AdminDashboardPage() {
  const studios = [
    {
      id: "course-1",
      title: "Course 1: Classical Grammar",
      titleAr: "النَّحْوُ وَالصَّرْفُ",
      description: "Unified Studio: Manage levels, modules, lessons, native audio, exercises, Quran/Hadith passages, visual lesson canvases, and 'Did You Know?' rhetorical insights — all in one page.",
      icon: BookOpen,
      badge: "Unified Grammar Studio",
      href: "/courses/course-1",
      actionText: "Open Course 1 Studio",
    },
    {
      id: "course-2",
      title: "Course 2: Spoken Arabic",
      titleAr: "الْعَرَبِيَّةُ الْمُعَاصِرَةُ",
      description: "Manage Spoken dialogues with multi-person audio clips, lesson vocabulary & visual image uploads.",
      icon: MessageSquare,
      badge: "Spoken Track",
      href: "/courses/course-2",
      actionText: "Manage Spoken Arabic",
    },
    {
      id: "vocab-audio",
      title: "Vocabulary & Native Audio",
      titleAr: "الْمُفْرَدَاتُ وَالصَّوْتِيَّاتُ",
      description: "Upload image files, record native speaker audio, and construct vowelled dictionary cards.",
      icon: FileText,
      badge: "Audio & Media",
      href: "/vocabulary/new",
      actionText: "Open Media Studio",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#FFF7ED] text-[#C2410C] border border-orange-200 uppercase tracking-wider">
              Executive CMS Operations
            </span>
            <span className="text-xs text-[#64748B] font-mono">
              ● Server Running (Port 3001)
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#0F172A] mt-2 tracking-tight">
            Al-Arabi Curriculum Studio
          </h1>
          <p className="text-xs text-[#475569] mt-1">
            Select a studio below to manage curriculum levels, lessons, native audio recitations, and exercises.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admins"
            className="px-4 py-2.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C2410C] font-bold text-xs text-[#0F172A] transition-colors flex items-center gap-1.5 shadow-2xs"
          >
            <Users className="w-4 h-4 text-[#C2410C]" />
            <span>Admin Manager & RBAC</span>
          </Link>
          <a
            href="http://localhost:3000"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-[#C2410C] hover:bg-[#9A3412] font-bold text-xs text-white transition-colors shadow-xs flex items-center gap-1.5"
          >
            <span>Learner Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Sleek Studio Launcher Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {studios.map((studio) => {
          const StudioIcon = studio.icon;

          return (
            <div
              key={studio.id}
              className="pro-card rounded-2xl bg-white border border-[#E2E8F0] hover:border-[#C2410C] p-6 flex flex-col justify-between space-y-6 shadow-xs transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] flex items-center justify-center group-hover:bg-[#FFF7ED] transition-colors">
                    <StudioIcon className="w-5 h-5 text-[#C2410C]" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A]">
                    {studio.badge}
                  </span>
                </div>

                <div>
                  <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                    {studio.titleAr}
                  </span>
                  <h2 className="text-lg font-extrabold text-[#0F172A] mt-1">{studio.title}</h2>
                </div>

                <p className="text-xs text-[#475569] leading-relaxed">{studio.description}</p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0]">
                <Link
                  href={studio.href}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F8FAF6] hover:bg-[#C2410C] hover:text-white text-[#0F172A] font-bold text-xs transition-colors flex items-center justify-between group-hover:shadow-xs"
                >
                  <span>{studio.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
