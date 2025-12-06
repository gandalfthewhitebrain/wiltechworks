// app/articles/[slug]/page.tsx
import { fetchDrupalArticleBySlug } from "@/lib/fetchDrupalArticleBySlug";
import { notFound } from "next/navigation";

export const dynamicParams = true;
export const revalidate = 60;

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  if (!params?.slug) {
    notFound();
  }

  const article = await fetchDrupalArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const title = article.attributes?.title || "Untitled";
  const created = article.attributes?.created;

  return (
    <main className="max-w-3xl mx-auto p-6 font-sans">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      {created && (
        <p className="text-sm text-gray-500 mb-4">
          Published: {new Date(created).toLocaleDateString()}
        </p>
      )}
      <article
        className="prose max-w-none"
        dangerouslySetInnerHTML={{
          __html: article.attributes?.body?.value || "No body content.",
        }}
      />
    </main>
  );
}
