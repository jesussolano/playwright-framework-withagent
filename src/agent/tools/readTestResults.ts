import { defineTool } from "@github/copilot-sdk";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

export const readTestResults = defineTool("read_test_results", {
  description: "Read a generated test result or report file from the reports directory.",
  parameters: z.object({
    fileName: z.string().describe("Relative path of the report file within the reports/ directory"),
  }),
  skipPermission: true,
  async handler({ fileName }) {
    if (fileName.replaceAll("\\", "/").split("/").includes("..")) {
      return JSON.stringify({ error: "Path traversal is not allowed." });
    }

    const reportsDir = path.resolve(process.cwd(), "reports");
    const targetPath = path.resolve(reportsDir, fileName);

    if (!targetPath.startsWith(reportsDir)) {
      return JSON.stringify({ error: "File must be inside the reports directory." });
    }

    try {
      const content = await fs.readFile(targetPath, "utf8");
      return content.slice(0, 100_000);
    } catch {
      return JSON.stringify({
        status: "not_available",
        path: targetPath,
        message: "The result file does not exist yet.",
      });
    }
  },
});
