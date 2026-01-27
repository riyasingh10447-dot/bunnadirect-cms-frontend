"use client";

import {
  LayoutDashboard,
  FileText,
  Users,
  UserPlus,
  UserCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: "admin" | "editor";
}

export default function DashboardLayout({
  children,
  role = "editor",
}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      name: "Dashboard",
      href: role === "admin" ? "/admin" : "/user",
      icon: LayoutDashboard,
      roles: ["admin", "editor"],
    },
    {
      name: "Articles",
      href: "/article",
      icon: FileText,
      roles: ["admin", "editor"],
    },
    { name: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
    { name: "Add User", href: "/admin/add-user", icon: UserPlus, roles: ["admin"] },
    { name: "Account", href: "/account", icon: UserCircle, roles: ["admin", "editor"] },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) router.push("/login");
      else console.error("Logout failed");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#6b8e23] text-white flex flex-col fixed left-0 top-0 bottom-0">
        {/* Logo */}
        <div className="p-6 text-2xl font-semibold border-b border-[#1E1B4B]">
          bunnaDirectCMS
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 mt-2 space-y-1">
          {navLinks
            .filter((link) => link.roles.includes(role))
            .map(({ name, href, icon: Icon }) => {
              // ✅ Only highlight if pathname exactly matches or starts with href + "/"
              const active =
                pathname === href ||
                (pathname.startsWith(`${href}/`) && !pathname.startsWith("/admin/users") && href !== "/admin");

              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center px-4 py-2 rounded-md relative transition-all duration-200 ease-in-out ${
                    active
                      ? "text-white before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-[#3d2b1f]"
                      : "text-white hover:text-white"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-white shrink-0" />
                    <span
                      className={`relative text-sm after:absolute after:left-0 after:-bottom-[2px] after:h-[2px] after:w-full after:bg-[#3d2b1f] after:scale-x-0 after:transition-transform after:duration-300 after:origin-left group-hover:after:scale-x-100`}
                    >
                      {name}
                    </span>
                  </div>
                </Link>
              );
            })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-[#1E1B4B]">
          <button
            onClick={handleLogout}
            className="w-full py-2.5 rounded-md bg-[#3d2b1f] hover:bg-[#6b8e23] text-white font-semibold text-sm transition shadow-md border border-gray-300"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}



{/*"use client";

import { LayoutDashboard, FileText, Users, UserPlus, UserCircle, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Articles", href: "/article", icon: FileText },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Add User", href: "/admin/add-user", icon: UserPlus },
    { name: "Account", href: "/account", icon: UserCircle },
  ];

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F8FB]">
    
      <aside className="w-64 bg-[#1E2A3A] text-white flex flex-col">
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          RivalCMS
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navLinks.map(({ name, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  active
                    ? "bg-blue-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {name}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="m-4 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition-colors"
        >
          <LogOut className="h-5 w-5" /> Logout
        </button>
      </aside>

  
      <div className="flex-1 flex flex-col">
    
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-6">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
              A
            </div>
          </div>
        </header>

       
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
*/}