-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TYPE "public"."FieldImageType" AS ENUM('FULL_FIELD', 'RED_HALF', 'BLUE_HALF', 'FULL_FIELD_FLIPPED', 'RED_HALF_FLIPPED', 'BLUE_HALF_FLIPPED');--> statement-breakpoint
CREATE TYPE "public"."Team" AS ENUM('THEORY', 'BANG', 'BIRDS', 'MERGE', 'KNIGHTS', 'BLACKOUT', 'THUNDERSTAMPS', 'FIREBIRDS');--> statement-breakpoint
CREATE TABLE "Events" (
	"id" serial PRIMARY KEY NOT NULL,
	"seasonId" integer NOT NULL,
	"name" text NOT NULL,
	"eventType" text NOT NULL,
	"eventKey" text NOT NULL,
	"districtKey" text,
	"startDate" text NOT NULL,
	"endDate" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"venue" text
);
--> statement-breakpoint
CREATE TABLE "AlternateScoutData" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"scoutId" integer NOT NULL,
	"matchNumber" text NOT NULL,
	"dataJSON" text NOT NULL,
	"timestamp" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "FieldImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"seasonId" integer NOT NULL,
	"type" "FieldImageType" NOT NULL,
	"imageUrl" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "MatchComments" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"scoutId" integer NOT NULL,
	"teamNumber" integer NOT NULL,
	"matchNumber" text NOT NULL,
	"comment" text NOT NULL,
	"timestamp" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "MatchSchedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"matchNumber" text NOT NULL,
	"colour" text NOT NULL,
	"driverStation" integer NOT NULL,
	"eventId" integer NOT NULL,
	"teamNumber" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PitScoutImages" (
	"id" serial PRIMARY KEY NOT NULL,
	"seasonId" integer NOT NULL,
	"imageUrls" text[],
	"teamNumber" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PitScouting" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"teamNumber" integer NOT NULL,
	"length" text NOT NULL,
	"width" text NOT NULL,
	"weight" text NOT NULL,
	"driveBase" text NOT NULL,
	"gamepieceIntake" text NOT NULL,
	"autonomous" text NOT NULL,
	"teleop" text NOT NULL,
	"endgame" text NOT NULL,
	"gameSpecificJson" text NOT NULL,
	"driveteamExperience" text NOT NULL,
	"generalComments" text NOT NULL,
	"createdAt" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Actions" (
	"id" serial PRIMARY KEY NOT NULL,
	"isAuto" boolean NOT NULL,
	"eventId" integer NOT NULL,
	"scoutId" integer NOT NULL,
	"matchNumber" text NOT NULL,
	"teamNumber" integer NOT NULL,
	"actionName" text NOT NULL,
	"gamePiece" text NOT NULL,
	"location" text NOT NULL,
	"timestamp" text NOT NULL,
	"hasUndo" boolean,
	"wasDefended" boolean
);
--> statement-breakpoint
CREATE TABLE "StartingPositions" (
	"id" serial PRIMARY KEY NOT NULL,
	"eventId" integer NOT NULL,
	"scouterId" text NOT NULL,
	"matchNumber" text NOT NULL,
	"teamNumber" integer NOT NULL,
	"startingPosition" text NOT NULL,
	"hasPreload" boolean NOT NULL,
	"showedUp" boolean NOT NULL,
	"timestamp" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Seasons" (
	"id" serial PRIMARY KEY NOT NULL,
	"year" integer NOT NULL,
	"gameName" text NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"isActive" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "_prisma_migrations" (
	"id" varchar(36) PRIMARY KEY NOT NULL,
	"checksum" varchar(64) NOT NULL,
	"finished_at" timestamp with time zone,
	"migration_name" varchar(255) NOT NULL,
	"logs" text,
	"rolled_back_at" timestamp with time zone,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"applied_steps_count" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Users" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade" text,
	"isActive" boolean DEFAULT true NOT NULL,
	"createdAt" text NOT NULL,
	"updatedAt" text NOT NULL,
	"firstName" text,
	"isAdmin" boolean DEFAULT false NOT NULL,
	"lastName" text,
	"team" "Team",
	"isSignupComplete" boolean DEFAULT false NOT NULL,
	"clerkId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Events" ADD CONSTRAINT "Events_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Seasons"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AlternateScoutData" ADD CONSTRAINT "AlternateScoutData_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "AlternateScoutData" ADD CONSTRAINT "AlternateScoutData_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "public"."Users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "FieldImages" ADD CONSTRAINT "FieldImages_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Seasons"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "MatchComments" ADD CONSTRAINT "MatchComments_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "MatchComments" ADD CONSTRAINT "MatchComments_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "public"."Users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "MatchSchedule" ADD CONSTRAINT "MatchSchedule_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PitScoutImages" ADD CONSTRAINT "PitScoutImages_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "public"."Seasons"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "PitScouting" ADD CONSTRAINT "PitScouting_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "Actions" ADD CONSTRAINT "Actions_scoutId_fkey" FOREIGN KEY ("scoutId") REFERENCES "public"."Users"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "StartingPositions" ADD CONSTRAINT "StartingPositions_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "public"."Events"("id") ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
CREATE UNIQUE INDEX "AlternateScoutData_eventId_matchNumber_key" ON "AlternateScoutData" USING btree ("eventId" int4_ops,"matchNumber" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "FieldImages_seasonId_type_key" ON "FieldImages" USING btree ("seasonId" int4_ops,"type" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "MatchComments_eventId_matchNumber_teamNumber_key" ON "MatchComments" USING btree ("eventId" text_ops,"matchNumber" int4_ops,"teamNumber" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "PitScoutImages_seasonId_teamNumber_key" ON "PitScoutImages" USING btree ("seasonId" int4_ops,"teamNumber" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "PitScouting_eventId_teamNumber_key" ON "PitScouting" USING btree ("eventId" int4_ops,"teamNumber" int4_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "StartingPositions_eventId_matchNumber_teamNumber_key" ON "StartingPositions" USING btree ("eventId" text_ops,"matchNumber" int4_ops,"teamNumber" text_ops);--> statement-breakpoint
CREATE UNIQUE INDEX "Users_clerkId_key" ON "Users" USING btree ("clerkId" text_ops);
*/