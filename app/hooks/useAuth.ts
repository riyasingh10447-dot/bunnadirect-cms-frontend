"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requiredRoles?: string[]) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          router.push("/admin-login"); // fallback login
          return;
        }

        // Check if user's role is allowed
        if (requiredRoles && !requiredRoles.includes(data.role)) {
          router.push("/admin-login");
          return;
        }

        setAuthorized(true);
      } catch (err) {
        router.push("/admin-login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRoles]);

  return { loading, authorized };
}

{/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(requiredRole?: string) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || (requiredRole && data.role !== requiredRole)) {
          router.push("/admin-login");
          return;
        }

        setAuthorized(true);
      } catch (err) {
        router.push("/admin-login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, requiredRole]);

  return { loading, authorized };
}
*/}