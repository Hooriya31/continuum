"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectInput,
} from "@/lib/create-project-schema";

type Project = { id: string; name: string; description: string | null };

export function ProjectsDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateProjectInput>({
    resolver: zodResolver(createProjectSchema),
  });

  useEffect(() => {
    fetch("/api/create-project")
      .then((res) => res.json())
      .then((result) => setProjects(result.data ?? []))
      .catch(() => setServerError("Could not load your projects."));
  }, []);

  async function onSubmit(values: CreateProjectInput) {
    setServerError("");
    setConfirmation("");
    try {
      const res = await fetch("/api/create-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error || "Failed to create project");
        return;
      }

      setProjects((prev) => [result.data, ...prev]);
      setConfirmation("Project created.");
      reset();
    } catch {
      setServerError("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-900">
            Project name
          </label>
          <input
            id="name"
            {...register("name")}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
          {errors.name && (
            <p id="name-error" role="alert" aria-live="polite" className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-900">
            Description (optional)
          </label>
          <textarea
            id="description"
            {...register("description")}
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? "description-error" : undefined}
            className="mt-1 w-full rounded border border-slate-300 px-3 py-2"
          />
          {errors.description && (
            <p id="description-error" role="alert" aria-live="polite" className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {serverError && (
          <p role="alert" aria-live="polite" className="text-sm text-red-600">
            {serverError}
          </p>
        )}
        {confirmation && (
          <p role="status" aria-live="polite" className="text-sm text-green-700">
            {confirmation}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          {isSubmitting ? "Creating..." : "Create project"}
        </button>
      </form>

      <div>
        <h2 className="text-lg font-semibold text-slate-900">Saved projects</h2>
        <ul className="mt-2 flex flex-col gap-2">
          {projects.map((project) => (
            <li key={project.id} className="rounded border border-slate-200 p-3">
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}