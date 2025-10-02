"use client";

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