// app/page.tsx
import Link from "next/link";
import { fetchDrupalArticles } from "@/lib/fetchDrupalArticles";

export const revalidate = 60; // ISR every 60 seconds

export default async function HomePage() {
  const articles = await fetchDrupalArticles();

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-6">WilTechWorks Articles</h1>

      {articles.length === 0 && (
        <p className="text-gray-500">No articles found.</p>
      )}

      <ul className="space-y-4">
        {articles.map((article) => {
          const alias = article.attributes.path?.alias;
          const slug = alias ? alias.split("/").pop() : article.id;

          return (
            <li key={article.id} className="border p-4 rounded">
              <h2 className="text-xl font-semibold mb-1">
                <Link href={`/articles/${slug}`}>
                  {article.attributes.title}
                </Link>
              </h2>
              <p className="text-xs text-gray-500">
                {new Date(article.attributes.created).toLocaleDateString()}
              </p>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
