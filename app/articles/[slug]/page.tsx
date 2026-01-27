interface ArticlePageProps {
  params: { slug: string };
}

async function fetchArticle(slug: string) {
  const res = await fetch(
    `http://localhost:5000/api/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) throw new Error("Article not found");

  return res.json();
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  const article = await fetchArticle(slug);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>

      <div
        dangerouslySetInnerHTML={{ __html: article.body }}
      />

      <small className="text-sm text-gray-500">
        Created: {new Date(article.createdAt).toLocaleString()}
      </small>
    </div>
  );
}

{/*async function fetchArticle(slug: string) {
  const res = await fetch(`http://localhost:3000/article/${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Article not found");
  }
  return res.json();
}

interface Props {
  params: { slug: string };
}

export default async function ArticlePage({ params }: Props) {
  const article = await fetchArticle(params.slug);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-800 mb-6">{article.body}</p>
      <small className="text-sm text-gray-500">
        Created: {new Date(article.createdAt).toLocaleString()}
      </small>
    </div>
  );
}
*/}