import { defineTool } from "@github/copilot-sdk";
import { faker } from "@faker-js/faker";
import { z } from "zod";

export const generateTestData = defineTool("generate_test_data", {
  description:
    "Generate realistic deterministic-shaped test data for common web test scenarios. No production data is accessed.",
  parameters: z.object({
    type: z.enum(["user", "address", "productSearch"]),
    count: z.number().int().min(1).max(20).default(1),
  }),
  skipPermission: true,
  async handler({ type, count }) {
    const data = Array.from({ length: count }, () => {
      if (type === "user") {
        return {
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: "Test1234!",
        };
      }

      if (type === "address") {
        return {
          street: faker.location.streetAddress(),
          city: faker.location.city(),
          state: faker.location.state(),
          zipCode: faker.location.zipCode(),
          country: faker.location.country(),
        };
      }

      return {
        query: faker.commerce.productName().split(" ").slice(0, 2).join(" "),
      };
    });

    return JSON.stringify({ type, count, data }, null, 2);
  },
});
