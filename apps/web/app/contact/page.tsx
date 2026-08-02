"use client";

import React, { useState } from "react";
import LearnerNavbar from "../components/LearnerNavbar";
import { Mail, Send, Clock, ShieldCheck, MessageSquare } from "lucide-react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Main Contact Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full brand-badge uppercase tracking-wider">
            Platform Feedback & Operations
          </span>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Get in Touch with Al-Arabi Team
          </h1>
          <p className="text-xs md:text-sm text-[#475569] max-w-lg mx-auto">
            Send platform feedback, operational inquiries, or bug reports to our administration team.
          </p>
        </div>

        {/* Grid: Contact Form & Info Box */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left Form */}
          <div className="md:col-span-7 pro-card rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
            {submitted ? (
              <div className="p-8 text-center space-y-3 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl">
                <CheckCircle2 className="w-10 h-10 text-[#C2410C] mx-auto" />
                <h3 className="font-extrabold text-[#0F172A] text-base">Feedback Submitted!</h3>
                <p className="text-xs text-[#475569]">
                  Thank you, <strong>{name}</strong>. Our team will review your message and reply to <strong>{email}</strong> if requested.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Abdullah Omar"
                    className="w-full p-3 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#C2410C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full p-3 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#C2410C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-[#64748B] block mb-1">
                    Feedback / Inquiry Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide your platform feedback, bug report, or operational inquiry..."
                    className="w-full p-3 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-xs leading-relaxed text-[#0F172A] focus:outline-none focus:border-[#C2410C] resize-y"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Feedback to Operations</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Info Box */}
          <div className="md:col-span-5 space-y-4">
            <div className="pro-card rounded-2xl p-6 space-y-4 shadow-xs">
              <h3 className="font-extrabold text-[#0F172A] text-sm border-b border-[#E2E8F0] pb-3">
                Official Channels & Community
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">Direct Operations Email</span>
                    <span className="text-[#64748B] font-mono">feedback@alarabi-academy.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#0F172A] block">Guaranteed Response Time</span>
                    <span className="text-[#64748B]">Within 24 hours (Sunday – Thursday)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0] font-bold text-xs flex items-center justify-center gap-2 hover:border-[#C2410C] transition-colors"
                >
                  <span>Telegram Student Channel</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0] font-bold text-xs flex items-center justify-center gap-2 hover:border-[#C2410C] transition-colors"
                >
                  <span>Discord Peer Study Server</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
