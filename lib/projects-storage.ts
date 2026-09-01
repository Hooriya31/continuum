export type Project = {
  id: string;
  name: string;
  createdAt: string;
};

export const PROJECTS_STORAGE_KEY = "continuum.projects";

export function loadProjects(): Project[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(PROJECTS_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(isProject);
  } catch {
    return [];
  }
}

export function saveProjects(projects: Project[]): void {
  window.localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
}

function isProject(value: unknown): value is Project {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const candidate = value as Partial<Project>;
  return (
    typeof candidate.id === "string" &&
    typeof candidate.name === "string" &&
    typeof candidate.createdAt === "string"
  );
}
