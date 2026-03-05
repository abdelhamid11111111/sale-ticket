import type { Config } from "jest";

const config: Config = {
  projects: [
    {
      displayName: "backend",
      testMatch: [
        "**/__tests__/unit/backend/**/*.test.ts",
        "**/__tests__/integration/**/*.test.ts",
      ],
      testEnvironment: "node",
      transform: { "^.+\\.tsx?$": ["ts-jest", {}] },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
      transformIgnorePatterns: [
        "node_modules/(?!(.prisma|@prisma)/)",
      ],
    },
    {
      displayName: "frontend",
      testMatch: ["**/__tests__/unit/frontend/**/*.test.tsx"],
      testEnvironment: "jsdom",
      transform: {
        "^.+\\.tsx?$": ["ts-jest", { tsconfig: { jsx: "react-jsx" } }],
      },
      moduleNameMapper: { "^@/(.*)$": "<rootDir>/$1" },
      setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    },
  ],
};

export default config;