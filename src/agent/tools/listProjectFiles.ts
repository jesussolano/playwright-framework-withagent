import { defineTool } from "@github/copilot-sdk";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

const IGNORED = new Set([
  "node_modules",
  ".git",
  "reports",
]);

async function walk(dir: string, output: string[] = []): Promise<string[]> {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    if (IGNORED.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full, output);
    else output.push(full.replaceAll("\\", "/"));
  }
  return output;
}

export const listProjectFiles = defineTool("list_project_files", {
  description: "List source files in the automation project.",
  parameters: z.object({}),
  skipPermission: true,
  async handler() {
    return JSON.stringify(await walk(process.cwd()), null, 2);
  },
});
