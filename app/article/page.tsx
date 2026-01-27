"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import DashboardLayout from "../components/DashboardLayout";

interface Article {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

interface UserInfo {
  email: string;
  role: "admin" | "editor";
}

export default function ArticlesPage() {
  const { loading, authorized } = useAuth(["admin", "editor"]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  // ✅ Fetch user info to determine role
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check`, {
          credentials: "include",
        });
        if (!res.ok) {
          router.push("/admin-login");
          return;
        }

        const data = await res.json();
        setUserInfo({ email: data.email, role: data.role });
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/admin-login");
      }
    };

    fetchUser();
  }, [router]);

  // ✅ Fetch articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article`);
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchArticles();
  }, []);

  if (loading || !userInfo) return <p>Loading...</p>;

  return (
    <DashboardLayout role={userInfo.role}>
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-[#0A0528]">Manage Articles</h1>

          {/* Only show Add Article button to Admin */}
          {["admin", "editor"].includes(userInfo.role) && (
  <button
    className="bg-[#3d2b1f] text-white px-4 py-2 rounded hover:bg-[#6b8e23] transition"
    onClick={() => router.push("/article/add-new")}
  >
    Add New Article
  </button>
)}

        </div>

        {articles.length === 0 && <p>No articles found.</p>}

        <div className="grid gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-[#0A0528]">{article.title}</h2>
              <p className="text-gray-500 text-sm">
                Created: {new Date(article.createdAt).toLocaleString()}
              </p>

              <div className="mt-4 flex gap-2">
                <button
                  className="bg-[#0A0528] text-white px-4 py-2 rounded hover:bg-[#B88D3B] transition"
                  onClick={() => router.push(`/article/edit/${article.slug}`)}
                >
                  Edit
                </button>

                <button
  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
  onClick={async () => {
    if (confirm(`Are you sure you want to delete "${article.title}"?`)) {
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${article.slug}`, {
        method: "DELETE",
        credentials: "include",
      });
      setArticles((prev) => prev.filter((a) => a.id !== article.id));
    }
  }}
>
  Delete
</button>

              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
{/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

interface Article {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminArticlesPage() {
  const { loading, authorized } = useAuth(["admin", "editor"]);

  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`
        );
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Articles</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => router.push("/article/add-new")}
        >
          Add New Article
        </button>
      </div>

      {articles.length === 0 && <p>No articles found.</p>}

      <div className="grid gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="p-4 border rounded shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">
              Created: {new Date(article.createdAt).toLocaleString()}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  router.push(`/article/edit/${article.slug}`)
                }
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={async () => {
                  if (
                    confirm(
                      `Are you sure you want to delete "${article.title}"?`
                    )
                  ) {
                    await fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${article.slug}`,
                      {
                        method: "DELETE",
                        credentials: "include",
                      }
                    );
                    setArticles((prev) =>
                      prev.filter((a) => a.id !== article.id)
                    );
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/}

{/*"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";

interface Article {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
}

export default function AdminArticlesPage() {
 const { loading, authorized } = useAuth(["admin", "editor"]);

  const [articles, setArticles] = useState<Article[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !authorized) {
      router.push("/admin-login");
    }
  }, [loading, authorized, router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/article`
        );
        const data = await res.json();
        setArticles(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Articles</h1>

      {articles.length === 0 && <p>No articles found.</p>}

      <div className="grid gap-6">
        {articles.map((article) => (
          <div
            key={article.id}
            className="p-4 border rounded shadow hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-600">
              Created: {new Date(article.createdAt).toLocaleString()}
            </p>

            <div className="mt-4 flex gap-2">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={() =>
                  router.push(`/article/edit/${article.slug}`)
                }
              >
                Edit
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                onClick={async () => {
                  if (
                    confirm(
                      `Are you sure you want to delete "${article.title}"?`
                    )
                  ) {
                    await fetch(
                      `${process.env.NEXT_PUBLIC_BACKEND_URL}/article/${article.slug}`,
                      {
                        method: "DELETE",
                        credentials: "include",
                      }
                    );
                    setArticles((prev) =>
                      prev.filter((a) => a.id !== article.id)
                    );
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
*/}