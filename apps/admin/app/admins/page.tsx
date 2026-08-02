"use client";

import React, { useState } from "react";
import Link from "next/link";

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "CONTENT_ADMIN";
  assignedCourses: string[];
  status: "ACTIVE" | "INVITED";
  lastActive: string;
}

export default function AdminManagerPage() {
  const [admins, setAdmins] = useState<AdminUser[]>([
    {
      id: "adm-1",
      name: "Super Admin",
      email: "admin@alarabi.edu",
      role: "SUPER_ADMIN",
      assignedCourses: ["Course 1: Grammar", "Course 2: Fusha", "Passages Studio"],
      status: "ACTIVE",
      lastActive: "Active Now",
    },
    {
      id: "adm-2",
      name: "Dr. Tariq Al-Mansoor",
      email: "tariq@alarabi.edu",
      role: "CONTENT_ADMIN",
      assignedCourses: ["Course 1: Classical Grammar"],
      status: "ACTIVE",
      lastActive: "2 hours ago",
    },
    {
      id: "adm-3",
      name: "Fatima Al-Zahra",
      email: "fatima@alarabi.edu",
      role: "CONTENT_ADMIN",
      assignedCourses: ["Course 2: Informal Fusha", "Vocab & Audio Studio"],
      status: "INVITED",
      lastActive: "Pending Invite",
    },
  ]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [newAdminName, setNewAdminName] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminRole, setNewAdminRole] = useState<"SUPER_ADMIN" | "CONTENT_ADMIN">("CONTENT_ADMIN");

  const handleInviteAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    const newAdmin: AdminUser = {
      id: `adm-${Date.now()}`,
      name: newAdminName,
      email: newAdminEmail,
      role: newAdminRole,
      assignedCourses: newAdminRole === "SUPER_ADMIN" ? ["All Courses"] : ["Course 1: Grammar"],
      status: "INVITED",
      lastActive: "Pending Invite",
    };
    setAdmins([...admins, newAdmin]);
    setNewAdminName("");
    setNewAdminEmail("");
    setIsInviteModalOpen(false);
  };

  const handleToggleRole = (id: string) => {
    setAdmins(
      admins.map((adm) =>
        adm.id === id
          ? {
              ...adm,
              role: adm.role === "SUPER_ADMIN" ? "CONTENT_ADMIN" : "SUPER_ADMIN",
            }
          : adm
      )
    );
  };

  const handleRevokeAdmin = (id: string) => {
    if (confirm("Revoke admin access for this user?")) {
      setAdmins(admins.filter((adm) => adm.id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-claude-border pb-4">
        <div>
          <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">
            Admin Manager & Role-Based Access Control (RBAC)
          </h1>
          <p className="text-xs text-claude-textMuted mt-0.5">
            Super Admin Portal: Manage admin credentials, invite content creators, and configure permissions.
          </p>
        </div>

        <button
          onClick={() => setIsInviteModalOpen(true)}
          className="px-5 py-2.5 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
        >
          + Invite New Admin
        </button>
      </div>

      {/* Admin Table */}
      <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden">
        <div className="p-6 border-b border-claude-border flex items-center justify-between bg-claude-bg/40">
          <div>
            <h2 className="font-extrabold text-claude-textMain text-base">
              Authorized Administrators ({admins.length})
            </h2>
            <p className="text-xs text-claude-textMuted">
              Super Admins have full platform rights; Content Admins manage assigned course studios.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-claude-bg border-b border-claude-border text-[11px] font-bold text-claude-textMuted uppercase tracking-wider">
                <th className="py-3.5 px-6">Administrator Name & Email</th>
                <th className="py-3.5 px-6">System Role</th>
                <th className="py-3.5 px-6">Assigned Permissions</th>
                <th className="py-3.5 px-6">Account Status</th>
                <th className="py-3.5 px-6 text-right">RBAC Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-claude-border text-xs">
              {admins.map((adm) => (
                <tr key={adm.id} className="hover:bg-claude-bg/60 transition-colors">
                  <td className="py-4 px-6">
                    <span className="font-bold text-claude-textMain block text-sm">{adm.name}</span>
                    <span className="text-claude-textMuted font-mono text-[11px]">{adm.email}</span>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                        adm.role === "SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-900 border-purple-200"
                          : "bg-blue-100 text-blue-900 border-blue-200"
                      }`}
                    >
                      {adm.role === "SUPER_ADMIN" ? "👑 Super Admin" : "📝 Content Admin"}
                    </span>
                  </td>

                  <td className="py-4 px-6">
                    <div className="flex flex-wrap gap-1">
                      {adm.assignedCourses.map((c, i) => (
                        <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-claude-bg border border-claude-border">
                          {c}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded ${
                        adm.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-900 border border-emerald-200"
                          : "bg-amber-100 text-amber-900 border border-amber-200"
                      }`}
                    >
                      {adm.status} • {adm.lastActive}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => handleToggleRole(adm.id)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-claude-border text-claude-textMain font-bold text-xs hover:border-claude-borderHover"
                    >
                      Toggle Role
                    </button>
                    {adm.role !== "SUPER_ADMIN" && (
                      <button
                        onClick={() => handleRevokeAdmin(adm.id)}
                        className="px-3 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 font-bold text-xs hover:bg-rose-100"
                      >
                        Revoke Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite Admin Modal */}
      {isInviteModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-claude-border rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-claude-border pb-4">
              <h3 className="font-extrabold text-claude-textMain text-lg">
                Invite New Administrator
              </h3>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-claude-textMuted hover:text-claude-textMain text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInviteAdmin} className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-claude-textMuted block mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newAdminName}
                  onChange={(e) => setNewAdminName(e.target.value)}
                  placeholder="e.g. Dr. Hassan Al-Bakri"
                  className="w-full p-3 rounded-xl bg-claude-bg border border-claude-border text-xs font-semibold text-claude-textMain focus:outline-none focus:border-claude-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-claude-textMuted block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={newAdminEmail}
                  onChange={(e) => setNewAdminEmail(e.target.value)}
                  placeholder="hassan@alarabi.edu"
                  className="w-full p-3 rounded-xl bg-claude-bg border border-claude-border text-xs font-semibold text-claude-textMain focus:outline-none focus:border-claude-terracotta"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-claude-textMuted block mb-1">
                  System Role
                </label>
                <select
                  value={newAdminRole}
                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                  className="w-full p-3 rounded-xl bg-claude-bg border border-claude-border text-xs font-bold text-claude-textMain focus:outline-none"
                >
                  <option value="CONTENT_ADMIN">Content Admin (Manage Courses & Exercises)</option>
                  <option value="SUPER_ADMIN">Super Admin (Full Access + User Management)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsInviteModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white border border-claude-border text-xs font-semibold text-claude-textMain"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs shadow-sm"
                >
                  🚀 Send Admin Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
