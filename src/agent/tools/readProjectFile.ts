import { defineTool } from "@github/copilot-sdk";
import { promises as fs } from "node:fs";
import path from "node:path";
import { z } from "zod";

const ALLOWED_DIRECTORIES = new Set([
  "src",
  "tests",
  "pages",
  "api",
  "fixtures",
  "utils",
  "data",
  "config",
  "prompts",
  "reports",
  ".vscode",
  ".github",
]);

const ALLOWED_ROOT_FILES = new Set([
  "README.md",
  "package.json",
  "playwright.config.ts",
  "tsconfig.json",
  ".env.example",
]);

function hasPathTraversal(filePath: string): boolean {
  return filePath.replaceAll("\\", "/").split("/").includes("..");
}

function isAllowedProjectFile(projectRoot: string, filePath: string): boolean {
  const relativePath = path.relative(projectRoot, filePath);

  if (
    !relativePath ||
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    return false;
  }

  const [firstSegment, ...remainingSegments] = relativePath.split(path.sep);
  return (
    ALLOWED_DIRECTORIES.has(firstSegment) ||
    (remainingSegments.length === 0 && ALLOWED_ROOT_FILES.has(firstSegment))
  );
}

export const readProjectFile = defineTool("read_project_file", {
  description:
    "Read a text file from an allowed automation-project directory. Path traversal is rejected.",
  parameters: z.object({
    filePath: z.string(),
  }),
  skipPermission: true,
  async handler({ filePath }) {
    if (hasPathTraversal(filePath)) {
      return JSON.stringify({ error: "File path is not allowed." });
    }

    try {
      const projectRoot = await fs.realpath(process.cwd());
      const candidatePath = path.resolve(projectRoot, filePath);

      if (!isAllowedProjectFile(projectRoot, candidatePath)) {
        return JSON.stringify({ error: "File path is not allowed." });
      }

      const resolvedPath = await fs.realpath(candidatePath);
      if (!isAllowedProjectFile(projectRoot, resolvedPath)) {
        return JSON.stringify({ error: "File path is not allowed." });
      }

      const content = await fs.readFile(resolvedPath, "utf8");
      return content.slice(0, 100_000);
    } catch (error) {
      return JSON.stringify({
        error: `Unable to read file: ${
          error instanceof Error ? error.message : "unknown error"
        }`,
      });
    }
  },
});
