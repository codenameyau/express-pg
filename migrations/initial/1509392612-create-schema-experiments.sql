CREATE SCHEMA IF NOT EXISTS "experiments";

-- DROP TABLE IF EXISTS "experiments"."experiment";
-- DROP TABLE IF EXISTS "experiments"."event";

CREATE TABLE IF NOT EXISTS "experiments"."experiment" (
	"id" serial,
	"app" varchar(64),
	"name" varchar(64),
	"created_by" varchar(64),
	"date_created" timestamp DEFAULT now(),
	"description" text,
	"is_active" boolean DEFAULT true,
	"attributes" jsonb,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "experiments"."event" (
	"id" serial,
	"experiment_id" int,
	"user_id" int,
	"event" varchar(64),
	"timestamp" timestamp DEFAULT now(),
	"attributes" jsonb,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("experiment_id") REFERENCES "experiments"."experiment"("id") ON DELETE CASCADE
);
