"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";
import { apiVersion } from "./sanity/lib/api";
import { singletonPlugin } from "./sanity/plugins/singleton";

export default defineConfig({
  name: "salem-portfolio",
  title: "Mohamed Salem Portfolio",
  projectId: "282m3u9v",
  dataset: "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            // Document types
            ...S.documentTypeListItems().filter(
              (listItem) => !["siteSettings"].includes(listItem.getId() ?? ""),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
    singletonPlugin(["siteSettings"]),
  ],
  schema: {
    types: schemaTypes,
  },
});
