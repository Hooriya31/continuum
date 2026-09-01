"use client";

import { useEffect, useState } from "react";
import { CreateProjectForm } from "@/components/CreateProjectForm";
import { ProjectList } from "@/components/ProjectList";
import {
  loadProjects,
  saveProjects,
  type Project,
} from "@/lib/projects-storage";

export function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [storageError, setStorageError] = useState<string | null>(null);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  async function handleCreate(name: string) {
    const project: Project = {
      id: crypto.randomUUID(),
      name,
      createdAt: new Date().toISOString(),
    };
    const next = [project, ...projects];

    try {
      saveProjects(next);
      setStorageError(null);
      setProjects(next);
    } catch {
      setStorageError("Could not save the project in this browser.");
      throw new Error("storage write failed");
    }
  }

  return (
    <main id="main-content" className="flex flex-col gap-10">
      <section aria-labelledby="create-project-heading" className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 id="create-project-heading" className="text-xl font-semibold text-slate-900">
          Create a project
        </h2>
        <p className="mt-1 mb-6 text-sm text-slate-700">
          Name is required. You can add notes and AI briefings later.
        </p>
        <CreateProjectForm onCreate={handleCreate} />
        {storageError ? (
          <p role="alert" className="mt-4 text-sm text-red-800">
            {storageError}
          </p>
        ) : null}
      </section>
      <section aria-labelledby="project-list-heading">
        <h2 id="project-list-heading" className="mb-4 text-xl font-semibold text-slate-900">
          Saved projects
        </h2>
        <ProjectList projects={projects} />
      </section>
    </main>
  );
}
