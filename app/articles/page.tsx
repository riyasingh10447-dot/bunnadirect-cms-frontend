async function fetchArticles() {
  const res = await fetch("http://localhost:3000/article", {
    cache: "no-store", // Always fetch fresh data
  });
  if (!res.ok) {
    throw new Error("Failed to fetch articles");
  }
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await fetchArticles();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">All Articles</h1>
      <ul className="space-y-4">
        {articles.map((article: any) => (
          <li key={article.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{article.title}</h2>
            <p className="text-gray-700">{article.body}</p>
            <small className="text-sm text-gray-500">
              Slug: {article.slug} | Created: {new Date(article.createdAt).toLocaleString()}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
}
