import { seed } from "drizzle-seed";
import { db } from "@/app/db";
import * as schema from "./schema";
import { faker } from '@faker-js/faker';
import { Publication } from "./schema/publications.schema";

export async function seedDatabase() {
  console.log('Seeding database... 🌱');
  
  await seed(db, schema).refine((f) => ({
    publications: {
      count: 15,
      columns: {
        title: f.fullName(),
        subtitle: f.fullName(),
        description: f.fullName(),
      },
    },
  }));

  console.log('Seeding complete! ✨');
}

seedDatabase();