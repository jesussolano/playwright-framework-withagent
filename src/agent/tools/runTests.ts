import { defineTool } from "@github/copilot-sdk";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { z } from "zod";

const execFileAsync = promisify(execFile);

export const runTests = defineTool("run_tests", {
  description:
    "Run the project's Playwright test suites (all, ui, api, or e2e). This tool executes only approved test commands.",
  parameters: z.object({
    runner: z.enum(["all", "ui", "api", "e2e", "playwright"]).default("all"),
    tag: z.string().optional().describe("Tag or grep expression to filter tests, e.g. @smoke"),
  }),
  skipPermission: true,
  async handler({ runner, tag }) {
    const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
    let script = "test";

    if (runner === "ui") {
      script = "test:ui";
    } else if (runner === "api") {
      script = "test:api";
    } else if (runner === "e2e") {
      script = "test:e2e";
    }

    const args = ["run", script, "--", ...(tag ? ["--grep", tag] : [])];

    try {
      const result = await execFileAsync(npmCommand, args, {
        cwd: process.cwd(),
        timeout: 180_000,
        maxBuffer: 8 * 1024 * 1024,
        env: process.env,
      });

      return JSON.stringify({
        status: "passed",
        runner,
        exitCode: 0,
        stdout: result.stdout.slice(-20_000),
        stderr: result.stderr.slice(-10_000),
      });
    } catch (error: any) {
      return JSON.stringify({
        status: "failed",
        runner,
        exitCode: error?.code ?? 1,
        stdout: String(error?.stdout ?? "").slice(-20_000),
        stderr: String(error?.stderr ?? error?.message ?? "").slice(-20_000),
      });
    }
  },
});
