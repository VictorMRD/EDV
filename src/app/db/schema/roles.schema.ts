import {
  uuid,
  pgTable,
  pgEnum,
  timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";

export const enumUserRoles = pgEnum("enumUserRoles", [
  "user",
  "admin",
  "moderator"
]);

// Table
export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().unique().defaultRandom(),
  rol: enumUserRoles("rol").notNull(),
  created_at: timestamp("createdAt").defaultNow().notNull(),
});

// Schemas
export const SchemaRole = createSelectSchema(roles);
export const SchemaRoleList = zod.array(SchemaRole);

export const SchemaRoleEdit = createInsertSchema(roles, {
  id: zod.string().uuid({ message: "Por favor seleccione una publicación válida." }),
  rol: zod.enum(enumUserRoles.values),
}).omit({
  created_at: true,
});

export const SchemaNewRole = createInsertSchema(roles, {
  rol: zod.enum(enumUserRoles.enumValues),
}).omit({
  id: true,
  created_at: true,
});

// Types
export type Role = zod.infer<typeof SchemaRole>;
export type RoleEdit = zod.infer<typeof SchemaRoleEdit>;
export type NewRole = zod.infer<typeof SchemaNewRole>;
export type RoleField = Pick<Role, "id" | "rol">;