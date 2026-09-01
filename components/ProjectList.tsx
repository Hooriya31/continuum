import type { Project } from "@/lib/projects-storage";

type ProjectListProps = {
  projects: Project[];
};

export function ProjectList({ projects }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <p className="text-base text-slate-700">
        No projects yet. Create one to get started.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200 rounded-md border border-slate-200 bg-white">
      {projects.map((project) => (
        <li key={project.id} className="px-4 py-3">
          <p className="font-medium text-slate-900">{project.name}</p>
          <p className="text-sm text-slate-600">
            Created {formatCreatedAt(project.createdAt)}
          </p>
        </li>
      ))}
    </ul>
  );
}

function formatCreatedAt(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return "unknown date";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}
