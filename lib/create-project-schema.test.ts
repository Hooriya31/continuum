import { describe, it, expect } from "vitest";
import { createProjectSchema } from "./create-project-schema";

describe("createProjectSchema", () => {
  it("accepts valid input", () => {
    const result = createProjectSchema.safeParse({ name: "Continuum" });
    expect(result.success).toBe(true);
  });

  it("rejects an empty name", () => {
    const result = createProjectSchema.safeParse({ name: "" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Enter a project name.");
    }
  });

  it("rejects a name over 60 characters", () => {
    const longName = "a".repeat(61);
    const result = createProjectSchema.safeParse({ name: longName });
    expect(result.success).toBe(false);
  });
});