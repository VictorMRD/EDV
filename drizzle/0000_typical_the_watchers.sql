CREATE TABLE "publications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar NOT NULL,
	"subtitle" varchar,
	"description" varchar NOT NULL,
	CONSTRAINT "publications_id_unique" UNIQUE("id")
);
