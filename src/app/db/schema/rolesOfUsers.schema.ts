import {
  integer,
  pgTable,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import * as zod from "zod";
import { users } from "@/app/db/schema/users.schema";
import { roles } from "@/app/db/schema/roles.schema";


// Table
export const rolesOfUsers = pgTable("rolesOfUsers", {
  user_id: uuid('user_id')
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
                onUpdate: "restrict",
            }),
  rol_id: uuid('rol_id')
            .notNull()
            .references(() => roles.id, {
                onDelete: "cascade",
                onUpdate: "restrict",
            }),
  created_at: timestamp("createdAt").defaultNow().notNull(),
});

// Schemas
export const SchemaRolesOfUsers = createSelectSchema(rolesOfUsers);
export const SchemaRolesOfUsersList = zod.array(SchemaRolesOfUsers);

export const SchemaRoleOfUserEdit = createInsertSchema(rolesOfUsers, {
  user_id: zod.string().uuid({ message: "Por favor seleccione un usuario válido." }),
  role_id: zod.string().uuid({ message: "Por favor seleccione un rol válido"}),
}).omit({
  created_at: true,
});

export const SchemaNewRoleOfUser = createInsertSchema(rolesOfUsers, {
  user_id: uuid({ message: "Por favor seleccione un usuario válido." }),
  role_id: uuid({ message: "Por favor seleccione un rol válido"}),
}).omit({
  created_at: true,
});

// Types
export type RolesOfUsers = zod.infer<typeof SchemaRolesOfUsers>;
export type RolesOfUsersEdit = zod.infer<typeof SchemaRolesOfUsersEdit>;
export type NewRolesOfUsers = zod.infer<typeof SchemaNewRolesOfUsers>;
export type RolesOfUsersField = Pick<RolesOfUsers, "user_id" | "role_id">;