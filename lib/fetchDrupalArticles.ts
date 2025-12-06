// lib/fetchDrupalArticles.ts
import { DRUPAL_BASE_URL } from "./config";

export type DrupalArticle = {
  id: string;
  attributes: {
    title: string;
    created: string;
    body?: {
      value?: string;
    };
    path?: {
      alias?: string;
    };
  };
};

export async function fetchDrupalArticles(): Promise<DrupalArticle[]> {
  try {
    const res = await fetch(`${DRUPAL_BASE_URL}/jsonapi/node/article`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.error(
        "Failed to fetch articles from Drupal:",
        res.status,
        res.statusText
      );
      return [];
    }

    const data = await res.json();

    if (!data || !Array.isArray(data.data)) {
      console.error("Unexpected Drupal articles response shape:", data);
      return [];
    }

    return data.data as DrupalArticle[];
  } catch (error) {
    console.error("Error in fetchDrupalArticles:", error);
    return [];
  }
}
