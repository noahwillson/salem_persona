import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./api";

const isConfigured =
  projectId &&
  projectId !== "your_project_id" &&
  /^[a-z0-9-]+$/.test(projectId);

export const client = isConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: process.env.NODE_ENV === "production",
      perspective: "published",
      stega: {
        enabled: false,
        studioUrl: "/studio",
      },
    })
  : null;

/**
 * Safe fetch helper — returns fallback if Sanity isn't configured yet.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch<T = any>(
  query: string,
  params?: Record<string, unknown>,
  fallback?: unknown,
): Promise<T> {
  if (!client) return (fallback ?? []) as T;
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return await client.fetch<T>(query, params as any);
  } catch {
    return (fallback ?? []) as T;
  }
}
