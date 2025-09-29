const API_BASE = "http://localhost:3000";

export async function fetchArticles() {
  const res = await fetch(`${API_BASE}/article`);
  return res.json();
}

export async function createArticle(data: { title: string; body: string }) {
  const res = await fetch(`${API_BASE}/article`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function fetchArticleBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/article/${slug}`);
  return res.json();
}
