import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { CreateProjectForm } from "./CreateProjectForm";

describe("CreateProjectForm", () => {
  it("associates the name field with a visible label", () => {
    render(<CreateProjectForm onCreate={vi.fn()} />);

    expect(screen.getByLabelText("Project name")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Create project" }),
    ).toBeInTheDocument();
  });

  it("shows an error and does not create when the name is empty", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    render(<CreateProjectForm onCreate={onCreate} />);

    await user.click(screen.getByRole("button", { name: "Create project" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Enter a project name.");
    expect(onCreate).not.toHaveBeenCalled();
  });

  it("trims the name, creates the project, and clears the field", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn();
    render(<CreateProjectForm onCreate={onCreate} />);

    await user.type(screen.getByLabelText("Project name"), "  Capstone  ");
    await user.click(screen.getByRole("button", { name: "Create project" }));

    expect(onCreate).toHaveBeenCalledWith("Capstone");
    expect(screen.getByLabelText("Project name")).toHaveValue("");
  });

  it("shows an error when create fails", async () => {
    const user = userEvent.setup();
    const onCreate = vi.fn().mockRejectedValue(new Error("nope"));
    render(<CreateProjectForm onCreate={onCreate} />);

    await user.type(screen.getByLabelText("Project name"), "Capstone");
    await user.click(screen.getByRole("button", { name: "Create project" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Could not create the project. Try again.",
    );
  });
});
