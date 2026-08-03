import { getCollection, type CollectionEntry } from "astro:content";

export type ProjectEntry = CollectionEntry<"projects">;

export const projectStatusLabels = {
  released: "Выпущен",
  development: "В разработке",
  concept: "Концепция",
} as const satisfies Record<ProjectEntry["data"]["status"], string>;

export async function getPublishedProjects(): Promise<ProjectEntry[]> {
  const projects = await getCollection(
    "projects",
    ({ data }) => !data.draft,
  );

  return projects.sort(
    (first, second) =>
      first.data.order - second.data.order ||
      second.data.year - first.data.year,
  );
}
