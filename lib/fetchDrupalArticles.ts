// lib/fetchDrupalArticles.ts
import { DRUPAL_BASE_URL } from "./config";

export type DrupalArticle = {
  id: string;
  attributes: {
    title: string;
    created: string;
    path?: {
      alias?: string;
    };
    body?: {
      value?: string;
    };
  };
};

export async function fetchDrupalArticles(): Promise<DrupalArticle[]> {
  const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/article`, {
    // Incremental static regeneration: revalidate every 60s
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch articles: ${res.status}`);
  }

  const data = await res.json();
  return data.data as DrupalArticle[];
}
