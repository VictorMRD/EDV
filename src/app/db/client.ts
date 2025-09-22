import "dotenv/config";
import { Pool } from "pg";
import { dbCredentials } from "./dbCredentials.ts";

export const client = new Pool(dbCredentials);