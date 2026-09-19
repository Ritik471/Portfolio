import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "./ErrorBoundary";

const Boom = ({ explode = true }: { explode?: boolean }) => {
  if (explode) throw new Error("kaboom");
  return <p>recovered</p>;
};

let consoleError: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  consoleError = vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  consoleError.mockRestore();
});

describe("ErrorBoundary", () => {
  it("renders children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>all good</p>
      </ErrorBoundary>,
    );
    expect(screen.getByText("all good")).toBeInTheDocument();
  });

  it("shows the fallback panel instead of unmounting the page", () => {
    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();
    expect(screen.getByText("This section failed to load.")).toBeInTheDocument();
  });

  it("renders a custom fallback when given one", () => {
    render(
      <ErrorBoundary fallback={<p>custom fallback</p>}>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByText("custom fallback")).toBeInTheDocument();
  });

  it("logs the failure with its label so the source is identifiable", () => {
    render(
      <ErrorBoundary label="route">
        <Boom />
      </ErrorBoundary>,
    );
    const logged = consoleError.mock.calls.some((args) =>
      String(args[0]).includes("[error-boundary: route]"),
    );
    expect(logged).toBe(true);
  });

  it("recovers when Retry is pressed and the child no longer throws", () => {
    const { rerender } = render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>,
    );
    expect(screen.getByRole("alert")).toBeInTheDocument();

    rerender(
      <ErrorBoundary>
        <Boom explode={false} />
      </ErrorBoundary>,
    );
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));

    expect(screen.getByText("recovered")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
