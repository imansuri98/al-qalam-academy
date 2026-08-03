"use client";

import React, { useEffect } from "react";
import Link from "next/link";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Al-Arabi Admin Studio Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#F8FAF6] flex flex-col items-center justify-center p-6 text-center space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center text-3xl font-bold mx-auto">
        !
      </div>

      <div className="space-y-2 max-w-md">
        <h1 className="text-2xl font-extrabold text-[#0F172A]">Admin Studio Error</h1>
        <p className="text-xs text-[#64748B] leading-relaxed">
          An error occurred in the Admin Studio console.
        </p>
        {error.message && (
          <code className="text-[11px] font-mono p-2 rounded bg-rose-50 text-rose-800 border border-rose-200 block text-left">
            {error.message}
          </code>
        )}
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => reset()}
          className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs"
        >
          Reset Studio
        </button>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-xl bg-white border border-[#E2E8F0] text-[#0F172A] font-bold text-xs hover:border-[#C2410C]"
        >
          Admin Home
        </Link>
      </div>
    </div>
  );
}
