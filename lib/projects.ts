import projectsData from "@/content/projects.json";

/** Single source of truth: edit content in content/projects.json */
export interface Project {
  id: number;
  slug: string;
  title: string;
  category: string;
  type: "motion" | "web" | "event";
  year: string;
  description: string;
  image: string;
  detail: {
    heroImage: string;
    /** Optional: video URL for hero (e.g. MP4 or embed). When set, can be shown instead of heroImage. */
    heroVideo?: string | null;
    overview: string;
    role: string[];
    client: string;
    duration: string;
    gallery: string[];
    /** Optional: video URLs for project detail page. */
    videos?: string[];
    challenge: string;
    solution: string;
  };
}

const HIDDEN_PROJECT_SLUGS = new Set(["wises-digital-card-splash"]);

const projects: Project[] = (projectsData as { projects: Project[] }).projects.filter(
  (project) => !HIDDEN_PROJECT_SLUGS.has(project.slug)
);

export { projects };

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return projects.map((p) => p.slug);
}
