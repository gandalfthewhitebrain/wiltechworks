// lib/fetchDrupalArticleBySlug.ts
import { DRUPAL_BASE_URL } from "./config";
import type { DrupalArticle } from "./fetchDrupalArticles";

export async function fetchDrupalArticleBySlug(
  slug: string
): Promise<DrupalArticle | null> {
  const url = new URL(`${DRUPAL_BASE_URL}/jsonapi/node/article`);

  // Adjust this if your aliases are like /blog/slug instead of /articles/slug
  url.searchParams.set("filter[path][value]", `/articles/${slug}`);
  url.searchParams.set("filter[path][operator]", "=");

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch article by slug: ${res.status}`);
  }

  const data = await res.json();
  const article = (data.data as DrupalArticle[])[0];
  return article || null;
}
