import {
  uuid,
  varchar,
  pgTable,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";

// Tabla
export const users = pgTable("users", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  full_name: varchar("full_name").notNull(),
  email: varchar("email").unique().notNull(),
  password_hash: varchar("password_hash").notNull(),
  created_at: timestamp("created_at").defaultNow(),
});


// Esquemas
export const SchemaUser = createSelectSchema(users);
export const SchemaPublicationList = zod.array(SchemaUser);

export const SchemaUserEdit = createInsertSchema(users, {
  id: zod.string().uuid({message: "por favor seleccione un usuario valido"}),
  full_name: (schema) =>
    schema
      .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
      .max(255, { message: "El nombre no puede exceder los 255 caracteres." })
      .optional(), 
  email: (schema) =>
    schema
      .email({ message: "Por favor, ingrese un correo electrónico válido." })
      .optional(),
  password_hash: (schema) =>
    schema.min(8, { message: "La contraseña debe tener al menos 8 caracteres." }).optional(), // Hacemos la contraseña opcional para la edición
}).omit({
  created_at: true,
});

export const SchemaNewUser = createInsertSchema(users, {
  full_name: (schema) =>
    schema
      .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
      .max(255, { message: "El nombre no puede exceder los 255 caracteres." })
      .nonempty("Por favor, ingrese el nombre completo."),
  email: (schema) =>
    schema
      .email({ message: "Por favor, ingrese un correo electrónico válido." })
      .nonempty("El correo electrónico no puede estar vacío."),
  password_hash: (schema) =>
    schema
      .min(8, { message: "La contraseña debe tener al menos 8 caracteres." })
      .nonempty("La contraseña no puede estar vacía."),
}).omit({
  id: true,
  created_at: true,
});

// Tipos
export type User = zod.infer<typeof SchemaUser>;
export type NewUser = zod.infer<typeof SchemaNewUser>;
export type UserEdit = zod.infer<typeof SchemaUserEdit>;
export type UserField = Pick<User, "id" | "title">;
