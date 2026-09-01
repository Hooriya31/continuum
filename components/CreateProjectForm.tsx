"use client";

import { FormEvent, useId, useState } from "react";

type CreateProjectFormProps = {
  onCreate: (name: string) => void | Promise<void>;
};

export function CreateProjectForm({ onCreate }: CreateProjectFormProps) {
  const nameId = useId();
  const errorId = useId();
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError("Enter a project name.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      await onCreate(trimmed);
      setName("");
    } catch {
      setError("Could not create the project. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label htmlFor={nameId} className="text-sm font-medium text-slate-900">
          Project name
        </label>
        <input
          id={nameId}
          name="name"
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
            if (error) {
              setError(null);
            }
          }}
          autoComplete="off"
          disabled={isSubmitting}
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className="rounded-md border border-slate-400 bg-white px-3 py-2 text-base text-slate-900 outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-100"
        />
      </div>
      <p id={errorId} role="alert" aria-live="polite" className="min-h-6 text-sm text-red-800">
        {error}
      </p>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-fit rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-500"
      >
        {isSubmitting ? "Creating…" : "Create project"}
      </button>
    </form>
  );
}
