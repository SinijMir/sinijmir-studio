import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({
    base: "./src/content/projects",
    pattern: "**/*.{md,mdx}",
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      seoTitle: z.string().min(1),
      tagline: z.string().min(1),
      summary: z.string().min(1),
      category: z.string().min(1),
      projectType: z.enum(["studio", "client"]).default("studio"),
      status: z.enum(["released", "development", "concept"]),
      year: z.number().int().min(2000),
      order: z.number().int().nonnegative(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      technologies: z.array(z.string().min(1)).default([]),
      platforms: z.array(z.string().min(1)).default([]),
      cover: image().optional(),
      links: z
        .object({
          website: z.string().url().optional(),
          store: z.string().url().optional(),
          repository: z.string().url().optional(),
        })
        .optional(),
    }),
});

const services = defineCollection({
  loader: glob({
    base: "./src/content/services",
    pattern: "**/*.{md,mdx}",
  }),
  schema: z.object({
    title: z.string().min(1),
    seoTitle: z.string().min(1),
    description: z.string().min(1),
    eyebrow: z.string().min(1),
    lead: z.string().min(1),
    order: z.number().int().nonnegative(),
    draft: z.boolean().default(false),
    technologies: z.array(z.string().min(1)).default([]),
    outcomes: z.array(z.string().min(1)).default([]),
    bestFor: z.array(z.string().min(1)).default([]),
  }),
});

export const collections = { projects, services };
