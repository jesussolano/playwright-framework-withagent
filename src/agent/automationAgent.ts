import { CopilotClient } from "@github/copilot-sdk";
import { AUTOMATION_AGENT_INSTRUCTIONS } from "./instructions";
import { generateTestData } from "./tools/generateTestData";
import { createTestCase } from "./tools/createTestCase";
import { runTests } from "./tools/runTests";
import { readTestResults } from "./tools/readTestResults";
import { analyzeFailure } from "./tools/analyzeFailure";
import { listProjectFiles } from "./tools/listProjectFiles";
import { readProjectFile } from "./tools/readProjectFile";

const task =
  process.argv.slice(2).join(" ") ||
  "Review the current automation framework and propose the next three high-value automation tasks. Do not modify files.";

async function main(): Promise<void> {
  const client = new CopilotClient();

  try {
    const session = await client.createSession({
      model: "auto",
      systemMessage: {
        mode: "append",
        content: AUTOMATION_AGENT_INSTRUCTIONS,
      },
      tools: [
        generateTestData,
        createTestCase,
        runTests,
        readTestResults,
        analyzeFailure,
        listProjectFiles,
        readProjectFile,
      ],
      availableTools: ["custom:*"],
    });

    const response = await session.sendAndWait({ prompt: task });
    if (!response) {
      throw new Error(
        "Copilot finished without returning an assistant response.",
      );
    }

    console.log("\n=== AI AUTOMATION AGENT ===\n");
    console.log(response.data.content);
  } finally {
    await client.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
