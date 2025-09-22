import { uuid, varchar, real, pgTable } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";

// Table
export const publications = pgTable("publications", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  title: varchar("title").notNull(),
  subtitle: varchar("subtitle"),
  description: varchar("description").notNull(),
});

// Schemas
export const SchemaPublication = createSelectSchema(publications);
export const SchemaPublicationList = zod.array(SchemaPublication);
export const SchemaPublicationEdit = createInsertSchema(publications, {
  id: zod.string().uuid({ message: "Please provide a valid publication ID." }),
  title: (schema) =>
    schema
      .min(1, { message: "Title cannot be empty" })
      .max(55, { message: "Title should not exceed 55 characters" })
      .nonempty("Please give the publication a title"),
  subtitle: (schema) => schema.optional(),
  description: (schema) => schema.optional(),
});
export const SchemaNewPublication = createInsertSchema(publications, {
  title: (schema) =>
  schema
    .min(1, { message: "Title cannot be empty" })
    .max(55, { message: "Title should not exceed 55 characters" })
    .nonempty("Please give the publication a title"),
  subtitle: (schema) => schema.optional(),
  description: (schema) => schema.optional(),
}).omit({
  id: true,
});

// Types
export type Publication = zod.infer<typeof SchemaPublication>;
export type PublicationEdit = zod.infer<typeof SchemaPublicationEdit>;
export type NewPublication = zod.infer<typeof SchemaNewPublication>;
export type PublicationField = Pick<Publication, "id" | "title">;