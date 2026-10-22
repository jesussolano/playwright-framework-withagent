import { defineTool } from "@github/copilot-sdk";
import { z } from "zod";

export const analyzeFailure = defineTool("analyze_failure", {
  description:
    "Analyze a Playwright test failure supplied by the test runner and classify likely root cause.",
  parameters: z.object({
    error: z.string(),
    testName: z.string().optional(),
    locator: z.string().optional(),
  }),
  skipPermission: true,
  async handler({ error, testName, locator }) {
    const lower = error.toLowerCase();

    let category:
      | "locator"
      | "timeout"
      | "assertion"
      | "network"
      | "environment"
      | "unknown" = "unknown";

    if (lower.includes("locator") || lower.includes("strict mode")) {
      category = "locator";
    } else if (lower.includes("timeout")) {
      category = "timeout";
    } else if (
      lower.includes("expect") ||
      lower.includes("assertion") ||
      lower.includes("received")
    ) {
      category = "assertion";
    } else if (
      lower.includes("net::") ||
      lower.includes("econn") ||
      lower.includes("network")
    ) {
      category = "network";
    } else if (
      lower.includes("baseurl") ||
      lower.includes("environment") ||
      lower.includes("browser")
    ) {
      category = "environment";
    }

    return JSON.stringify(
      {
        testName,
        category,
        locator,
        evidence: error,
        nextActions: [
          "Inspect the failing test step and locator.",
          "Inspect trace or screenshot in reports/ if available.",
          "Verify application state and server response before changing code.",
          "Prefer a minimal, resilient locator or synchronization fix.",
          "Re-run the failing test after the change.",
        ],
      },
      null,
      2,
    );
  },
});
