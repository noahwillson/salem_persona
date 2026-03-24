import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      description: "Brief bio for the home page",
    }),
    defineField({
      name: "aboutText",
      title: "About Text",
      type: "array",
      of: [{ type: "block" }],
      description: "Full about page content",
    }),
    defineField({
      name: "portrait",
      title: "Portrait",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "availabilityStatus",
      title: "Availability Status",
      type: "string",
      options: {
        list: [
          { title: "Available for Freelance", value: "available" },
          { title: "Limited Availability", value: "limited" },
          { title: "Not Available", value: "unavailable" },
        ],
      },
      initialValue: "available",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", title: "Platform", type: "string" },
            { name: "url", title: "URL", type: "url" },
          ],
        },
      ],
    }),
    defineField({
      name: "behanceUrl",
      title: "Behance URL",
      type: "url",
    }),
    defineField({
      name: "resumeFile",
      title: "Resume File",
      type: "file",
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});
