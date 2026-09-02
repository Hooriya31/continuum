import { ProjectsDashboard } from "@/components/ProjectsDashboard";

export default function HomePage() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col gap-10 px-4 py-10 sm:px-6">
      <header>
        <p className="text-sm font-medium text-slate-600">Continuum</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-slate-900">
          Your projects
        </h1>
        <p className="mt-2 max-w-prose text-base text-slate-700">
          Create a project to start saving work context. This step does not call
          AI.
        </p>
      </header>
      <ProjectsDashboard />
    </div>
  );
}
