"use client";

import React, { useState } from "react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [authMode, setAuthMode] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleGoogleSignIn = () => {
    alert("Initiating Google OAuth login flow...");
  };

  const handleAppleSignIn = () => {
    alert("Initiating Sign in with Apple flow (Non-negotiable iOS requirement)...");
  };

  const handleEmailAuth = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Submitting ${authMode} for ${email}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl border border-claude-border shadow-claudeHover relative space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-claude-textMuted hover:text-claude-textMain transition-colors w-8 h-8 rounded-full flex items-center justify-center hover:bg-claude-bg"
        >
          ✕
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-claude-textMain">
            {authMode === "SIGN_IN" ? "Welcome Back to Al-Arabi" : "Create Your Learner Account"}
          </h2>
          <p className="text-xs text-claude-textMuted">
            Learn Conversational Fusha & Classical Grammar with Zero Transliteration
          </p>
        </div>

        {/* Social Auth Buttons */}
        <div className="space-y-3">
          {/* Sign in with Apple (Non-negotiable requirement) */}
          <button
            onClick={handleAppleSignIn}
            className="w-full py-3 px-4 rounded-xl bg-slate-900 text-white font-semibold text-sm flex items-center justify-center gap-3 hover:bg-black transition-colors shadow-sm"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.16-1.9-14.49-6.09-3.48-2.73-7.46-7.48-11.95-14.24-6.3-9.5-11.24-19.98-14.82-31.42-3.58-11.44-5.37-22.37-5.37-32.8 0-14.42 3.63-26.24 10.89-35.46 7.26-9.22 16.32-13.9 27.18-14.04 4.83 0 10.02 1.25 15.58 3.75 5.56 2.5 9.49 3.75 11.78 3.75 2.05 0 6.07-1.3 12.07-3.9 6-2.6 11.19-3.79 15.58-3.58 11.7.54 21.05 4.88 28.05 13.02-10.45 6.31-15.54 15.11-15.27 26.4.31 9.4 4.07 17.15 11.28 23.24 5.09 4.3 10.89 7.02 17.41 8.16-2.58 7.6-6.12 15.34-10.63 23.23zM119.22 31.85c0-6.73 2.45-13.12 7.35-18.17 4.9-5.05 11.03-8.08 18.39-9.08.31 2.2.37 4.29.18 6.27-.66 6.84-3.28 13.26-7.86 18.26-4.58 5-10.65 8.16-18.06 9.48-.3-2.1-.4-4.35-.18-6.76z" />
            </svg>
            Sign in with Apple
          </button>

          {/* Google OAuth */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full py-3 px-4 rounded-xl bg-claude-bg border border-claude-border text-claude-textMain font-semibold text-sm flex items-center justify-center gap-3 hover:border-claude-borderHover transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15s.7 5.3 1.9 7.7l3.7-2.9c-.7-.7-1.3-1.6-1.6-2.7z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z" />
            </svg>
            Continue with Google
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs text-claude-textMuted my-2">
          <div className="flex-1 border-t border-claude-border"></div>
          <span>OR EMAIL</span>
          <div className="flex-1 border-t border-claude-border"></div>
        </div>

        {/* Email & Password Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4">
          <div>
            <label className="text-xs text-claude-textMuted font-medium block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="learner@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-claude-textMain text-sm focus:outline-none focus:border-claude-terracotta"
            />
          </div>

          <div>
            <label className="text-xs text-claude-textMuted font-medium block mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl bg-claude-bg border border-claude-border text-claude-textMain text-sm focus:outline-none focus:border-claude-terracotta"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-sm transition-colors shadow-sm"
          >
            {authMode === "SIGN_IN" ? "Sign In" : "Create Free Account"}
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center text-xs text-claude-textMuted">
          {authMode === "SIGN_IN" ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setAuthMode("SIGN_UP")}
                className="text-claude-terracotta font-semibold hover:underline"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setAuthMode("SIGN_IN")}
                className="text-claude-terracotta font-semibold hover:underline"
              >
                Sign In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
