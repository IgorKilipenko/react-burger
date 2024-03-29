import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "9duhps",
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: `http://localhost:${process.env.PORT ?? 3000}/${process.env.PUBLIC_URL ?? ""}`,
  },
})
