import * as schema from "@/app/db/schema";
import { drizzle } from "drizzle-orm/node-postgres";
import { client } from "@/app/db/client";

export const db = drizzle(client, { schema });