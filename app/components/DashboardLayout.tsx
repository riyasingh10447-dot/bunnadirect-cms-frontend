"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  UserPlus,
  UserCircle,
  LogOut,
  Bell,
  Search,
  Stethoscope,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
  role = "admin",
}: { children: ReactNode; role?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Overview", href: role === "admin" ? "/admin" : "/user", icon: LayoutDashboard },
    { name: "Articles", href: "/article", icon: FileText },
    { name: "User Management", href: "/admin/users", icon: Users },
    { name: "Registration", href: "/admin/add-user", icon: UserPlus },
    { name: "Profile Settings", icon: UserCircle, href: "/account" },
  ];

  // ✅ Logout Functionality
  const handleLogout = async () => {
    try {
      // Backend logout endpoint ko call karein
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Cookies clear karne ke liye zaroori hai
      });

      if (res.ok) {
        // Logout successful, login page par redirect karein
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
      // Fallback: Agar backend fail ho jaye tab bhi login par bhej dein
      router.push("/user-login");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7FA]">
      {/* SIDEBAR */}
      <aside className="w-72 bg-[#0F172A] text-slate-300 flex flex-col fixed left-0 top-0 bottom-0 z-50 shadow-2xl border-r border-white/5">
        
        {/* Medical Branding */}
        <div className="h-28 flex flex-col items-center justify-center px-8 relative overflow-hidden">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-teal-500/10 blur-3xl rounded-full"></div>
          <div className="flex items-center gap-3 z-10">
             <div className="p-2.5 bg-gradient-to-br from-teal-400 to-blue-600 rounded-xl shadow-lg shadow-teal-500/20">
               <Stethoscope className="text-white h-7 w-7" />
             </div>
             <div className="flex flex-col">
               <span className="text-xl font-black text-white tracking-tight leading-none">
                 AR<span className="text-teal-400">medico</span>
               </span>
               <span className="text-[10px] font-medium text-slate-500 uppercase tracking-[0.2em] mt-1">Health Portal</span>
             </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1.5 overflow-y-auto">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 opacity-50">Main Menu</p>
          {navLinks.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3.5 px-4 py-3.5 rounded-2xl transition-all duration-300 relative ${
                  active ? "bg-teal-500/10 text-teal-400 border border-teal-500/20" : "hover:bg-white/5 hover:text-white"
                }`}
              >
                {active && <div className="absolute left-0 w-1 h-6 bg-teal-400 rounded-r-full shadow-[0_0_15px_rgba(45,212,191,0.6)]" />}
                <Icon className={`h-5 w-5 ${active ? "text-teal-400" : "text-slate-500 group-hover:text-teal-300"}`} />
                <span className={`text-sm font-semibold tracking-wide ${active ? "text-white" : ""}`}>{name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Profile Card & Logout Button */}
        <div className="p-6">
          <div className="p-4 rounded-[2rem] bg-gradient-to-b from-slate-800/40 to-slate-900/60 border border-white/5 backdrop-blur-sm shadow-inner text-center">
            <div className="flex items-center gap-3 mb-4 text-left">
              <div className="relative">
                
                
                
              </div>
            </div>
            
            {/* ✅ onClick added to handle logout */}
            <button 
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-800 hover:bg-red-500 text-slate-400 hover:text-white text-[10px] font-black transition-all duration-300 border border-white/5 uppercase tracking-widest group shadow-lg"
            >
              <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" /> 
              Sign Out 
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-72 flex flex-col">
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200 sticky top-0 z-40 flex items-center justify-between px-10">
          
          {/* Header Right Content (Search, Bell etc. as before) */}
        </header>

        <main className="p-8 min-h-[calc(100vh-5rem)]">
           <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}