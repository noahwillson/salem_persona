import type { NewDocumentCreationContext } from "sanity";

export const singletonPlugin = (types: string[]) => ({
  name: "singletonPlugin",
  document: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    newDocumentOptions: (
      prev: any[],
      { creationContext }: { creationContext: NewDocumentCreationContext },
    ) => {
      if (creationContext.type === "global") {
        return prev.filter(
          (templateItem: { id?: string }) =>
            !types.includes(templateItem.id ?? ""),
        );
      }
      return prev;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    actions: (prev: any[], { schemaType }: { schemaType: string }) => {
      if (types.includes(schemaType)) {
        return prev.filter(
          ({ action }: { action?: string }) =>
            action && !["unpublish", "delete", "duplicate"].includes(action),
        );
      }
      return prev;
    },
  },
});
