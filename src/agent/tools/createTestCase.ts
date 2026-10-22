import { defineTool } from "@github/copilot-sdk";
import { z } from "zod";

export const createTestCase = defineTool("create_test_case", {
  description:
    "Create a structured test-case proposal. This tool proposes content only; it does not modify repository files.",
  parameters: z.object({
    title: z.string(),
    preconditions: z.array(z.string()).default([]),
    steps: z.array(z.string()).min(1),
    expectedResults: z.array(z.string()).min(1),
    priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  }),
  skipPermission: true,
  async handler(input) {
    return JSON.stringify(
      {
        ...input,
        automationStatus: "proposal-only",
      },
      null,
      2,
    );
  },
});
