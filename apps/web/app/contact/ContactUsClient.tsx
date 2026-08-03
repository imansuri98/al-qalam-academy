"use client";

import React, { useState } from "react";
import LearnerNavbar from "../components/LearnerNavbar";
import { Mail, Send, Clock, ShieldCheck, MessageSquare, CheckCircle2, ArrowRight } from "lucide-react";

export default function ContactUsClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const validateForm = () => {
    const errs: { name?: string; email?: string; message?: string } = {};
    if (!name.trim() || name.trim().length < 2) {
      errs.name = "Please enter your full name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address (e.g. name@example.com).";
    }
    if (!message.trim() || message.trim().length < 10) {
      errs.message = "Please provide details in your message (minimum 10 characters).";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Main Contact Container */}
      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full brand-badge uppercase tracking-wider">
            Learner Support & Academic Desk
          </span>
          <h1 className="text-3xl font-extrabold text-[#0F172A] tracking-tight">
            Contact Al-Arabi Academy
          </h1>
          <p className="text-xs text-[#64748B] max-w-lg mx-auto">
            Have questions about Classical Grammar (Nahw & Sarf), Spoken Fusha, or subscription access? Our academic team responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Info Sidecards */}
          <div className="space-y-4">
            <div className="pro-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#C2410C]">
                <Mail className="w-4 h-4" />
                <span className="text-xs font-bold text-[#0F172A]">Direct Email</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Academic support & feedback:
              </p>
              <span className="text-xs font-bold text-[#C2410C] block">
                academic@alarabi.edu
              </span>
            </div>

            <div className="pro-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#C2410C]">
                <Clock className="w-4 h-4" />
                <span className="text-xs font-bold text-[#0F172A]">Response Time</span>
              </div>
              <p className="text-xs text-[#64748B]">
                Average response within 12-24 business hours.
              </p>
            </div>

            <div className="pro-card rounded-2xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-[#C2410C]">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold text-[#0F172A]">Zero Transliteration Guarantee</span>
              </div>
              <p className="text-xs text-[#64748B]">
                All course material is strictly formatted in vowelled Arabic script with Tashkeel.
              </p>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2 pro-card rounded-2xl p-6 md:p-8 space-y-6">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>
                <h3 className="text-xl font-extrabold text-[#0F172A]">Message Received!</h3>
                <p className="text-xs text-[#64748B] max-w-sm mx-auto">
                  Thank you for reaching out. Our academic team will review your message and reply to <span className="font-bold text-[#0F172A]">{email}</span> shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="text-base font-bold text-[#0F172A] border-b border-[#E2E8F0] pb-3">
                  Send a Message to Support
                </h2>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#64748B] block">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                    }}
                    placeholder="Hassan Al-Saeed"
                    className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-medium text-[#0F172A] focus:outline-none ${
                      errors.name ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                    }`}
                  />
                  {errors.name && (
                    <span className="text-[11px] font-bold text-rose-600 block">{errors.name}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#64748B] block">
                    Your Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                    }}
                    placeholder="hassan@example.com"
                    className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-medium text-[#0F172A] focus:outline-none ${
                      errors.email ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                    }`}
                  />
                  {errors.email && (
                    <span className="text-[11px] font-bold text-rose-600 block">{errors.email}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-[#64748B] block">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    value={message}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      if (errors.message) setErrors((prev) => ({ ...prev, message: undefined }));
                    }}
                    placeholder="How can we assist you with your Arabic learning journey?"
                    className={`w-full p-3 rounded-xl bg-[#F8FAF6] border text-xs font-medium text-[#0F172A] focus:outline-none ${
                      errors.message ? "border-rose-400 focus:border-rose-500" : "border-[#E2E8F0] focus:border-[#C2410C]"
                    }`}
                  />
                  {errors.message && (
                    <span className="text-[11px] font-bold text-rose-600 block">{errors.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Support Request</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
