import {
  uuid,
  varchar,
  pgTable,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";
import { users } from "@/app/db/schema/users.schema";

export const enumPublicationStatus = pgEnum("enumPublicationStatus", [
  "published",
  "hidden",
  "unfinished"
]);

// Table
export const publications = pgTable("publications", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  author_id: uuid("author_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "set null",
      onUpdate: "restrict",
    }),
  title: varchar("title").notNull(),
  slug: varchar("slug").notNull(),
  status: enumPublicationStatus("status").notNull(),
  published_at: timestamp("published_at").notNull(),
  created_at: timestamp("createdAt").defaultNow().notNull(),
});

// Schemas
export const SchemaPublication = createSelectSchema(publications);
export const SchemaPublicationList = zod.array(SchemaPublication);

export const SchemaPublicationEdit = createInsertSchema(publications, {
  id: zod.string().uuid({ message: "Por favor seleccione una publicación válida." }),
  author_id: zod.string().uuid({ message: "Por favor sleccione un autor válido."}),
  title: (schema) =>
    schema
      .min(1, { message: "El título no debe de estar vacio" })
      .max(55, { message: "El título no debe exceder los 55 carácteres" })
      .nonempty("Por favor ingrese un título para su publicación"),
  slug: (schema) => 
    schema
      .min(1, {message: "Por favor ingrese un mensaje descriptivo válido"})
      .nonempty("Debe de ingresar un mensaje descripcito válido"),  
  status: zod.enum(enumPublicationStatus.values),
  published_at: zod.date({ message: "Por favor ingrese una fecha de publicación válida." }).optional(),
}).omit({
  created_at: true,
});

export const SchemaNewPublication = createInsertSchema(publications, {
  author_id: uuid({ message: "Por favor seleccione un autor válido." }),
  title: (schema) =>
    schema
      .min(1, { message: "El título no debe de estar vacío." })
      .max(55, { message: "El título no debe exceder los 55 caracteres." })
      .nonempty("Por favor ingrese un título para su publicación."),
  slug: (schema) =>
    schema
      .min(1, { message: "Por favor ingrese un slug válido." })
      .nonempty("Debe de ingresar un slug válido."),
  status: zod.enum(enumPublicationStatus.enumValues),
  published_at: zod.date({ message: "Por favor ingrese una fecha de publicación válida." }).optional(),
}).omit({
  id: true,
  created_at: true,
});

// Types
export type Publication = zod.infer<typeof SchemaPublication>;
export type PublicationEdit = zod.infer<typeof SchemaPublicationEdit>;
export type NewPublication = zod.infer<typeof SchemaNewPublication>;
export type PublicationField = Pick<Publication, "id" | "title">;