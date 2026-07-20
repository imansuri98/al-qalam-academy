'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { BookOpen, LogOut, User, LogIn, UserPlus, Sparkles } from 'lucide-react'

export default function Navigation() {
  const { data: session, status } = useSession()

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-amiri text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent group-hover:opacity-85 transition-opacity">
                معهد القلم <span className="font-sans text-xs tracking-wider uppercase text-slate-500 font-normal">Al Qalam</span>
              </span>
            </Link>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              <BookOpen className="h-4 w-4" /> Chapters
            </Link>

            <Link
              href="/lab"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-colors shadow-sm"
            >
              <Sparkles className="h-4 w-4" /> AI Lab
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {status === 'loading' ? (
              <span className="h-4 w-12 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
            ) : session ? (
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                  <User className="h-4 w-4 text-indigo-500" />
                  <span>{session.user?.name || session.user?.email}</span>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all duration-200 cursor-pointer"
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  <LogIn className="h-4 w-4" /> Login
                </Link>
                <Link
                  href="/register"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-sm transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4" /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
