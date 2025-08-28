import { pgTable, foreignKey, serial, integer, text, uniqueIndex, boolean, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const fieldImageType = pgEnum("FieldImageType", ['FULL_FIELD', 'RED_HALF', 'BLUE_HALF', 'FULL_FIELD_FLIPPED', 'RED_HALF_FLIPPED', 'BLUE_HALF_FLIPPED'])
export const team = pgEnum("Team", ['THEORY', 'BANG', 'BIRDS', 'MERGE', 'KNIGHTS', 'BLACKOUT', 'THUNDERSTAMPS', 'FIREBIRDS'])


export const events = pgTable("Events", {
	id: serial().primaryKey().notNull(),
	seasonId: integer().notNull(),
	name: text().notNull(),
	eventType: text().notNull(),
	eventKey: text().notNull(),
	districtKey: text(),
	startDate: text().notNull(),
	endDate: text().notNull(),
	createdAt: text().notNull(),
	updatedAt: text().notNull(),
	venue: text(),
}, (table) => [
	foreignKey({
			columns: [table.seasonId],
			foreignColumns: [seasons.id],
			name: "Events_seasonId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const alternateScoutData = pgTable("AlternateScoutData", {
	id: serial().primaryKey().notNull(),
	eventId: integer().notNull(),
	scoutId: integer().notNull(),
	matchNumber: text().notNull(),
	dataJson: text().notNull(),
	timestamp: text().notNull(),
}, (table) => [
	uniqueIndex("AlternateScoutData_eventId_matchNumber_key").using("btree", table.eventId.asc().nullsLast().op("int4_ops"), table.matchNumber.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "AlternateScoutData_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.scoutId],
			foreignColumns: [users.id],
			name: "AlternateScoutData_scoutId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const fieldImages = pgTable("FieldImages", {
	id: serial().primaryKey().notNull(),
	seasonId: integer().notNull(),
	type: fieldImageType().notNull(),
	imageUrl: text().notNull(),
	createdAt: text().notNull(),
	updatedAt: text().notNull(),
}, (table) => [
	uniqueIndex("FieldImages_seasonId_type_key").using("btree", table.seasonId.asc().nullsLast().op("int4_ops"), table.type.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.seasonId],
			foreignColumns: [seasons.id],
			name: "FieldImages_seasonId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const matchComments = pgTable("MatchComments", {
	id: serial().primaryKey().notNull(),
	eventId: integer().notNull(),
	scoutId: integer().notNull(),
	teamNumber: integer().notNull(),
	matchNumber: text().notNull(),
	comment: text().notNull(),
	timestamp: text().notNull(),
}, (table) => [
	uniqueIndex("MatchComments_eventId_matchNumber_teamNumber_key").using("btree", table.eventId.asc().nullsLast().op("text_ops"), table.matchNumber.asc().nullsLast().op("int4_ops"), table.teamNumber.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "MatchComments_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.scoutId],
			foreignColumns: [users.id],
			name: "MatchComments_scoutId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const matchSchedule = pgTable("MatchSchedule", {
	id: serial().primaryKey().notNull(),
	matchNumber: text().notNull(),
	colour: text().notNull(),
	driverStation: integer().notNull(),
	eventId: integer().notNull(),
	teamNumber: integer().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "MatchSchedule_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const pitScoutImages = pgTable("PitScoutImages", {
	id: serial().primaryKey().notNull(),
	seasonId: integer().notNull(),
	imageUrls: text().array(),
	teamNumber: integer().notNull(),
}, (table) => [
	uniqueIndex("PitScoutImages_seasonId_teamNumber_key").using("btree", table.seasonId.asc().nullsLast().op("int4_ops"), table.teamNumber.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.seasonId],
			foreignColumns: [seasons.id],
			name: "PitScoutImages_seasonId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const pitScouting = pgTable("PitScouting", {
	id: serial().primaryKey().notNull(),
	eventId: integer().notNull(),
	teamNumber: integer().notNull(),
	length: text().notNull(),
	width: text().notNull(),
	weight: text().notNull(),
	driveBase: text().notNull(),
	gamepieceIntake: text().notNull(),
	autonomous: text().notNull(),
	teleop: text().notNull(),
	endgame: text().notNull(),
	gameSpecificJson: text().notNull(),
	driveteamExperience: text().notNull(),
	generalComments: text().notNull(),
	createdAt: text().notNull(),
}, (table) => [
	uniqueIndex("PitScouting_eventId_teamNumber_key").using("btree", table.eventId.asc().nullsLast().op("int4_ops"), table.teamNumber.asc().nullsLast().op("int4_ops")),
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "PitScouting_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const actions = pgTable("Actions", {
	id: serial().primaryKey().notNull(),
	isAuto: boolean().notNull(),
	eventId: integer().notNull(),
	scoutId: integer().notNull(),
	matchNumber: text().notNull(),
	teamNumber: integer().notNull(),
	actionName: text().notNull(),
	gamePiece: text().notNull(),
	location: text().notNull(),
	timestamp: text().notNull(),
	hasUndo: boolean(),
	wasDefended: boolean(),
}, (table) => [
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "Actions_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
	foreignKey({
			columns: [table.scoutId],
			foreignColumns: [users.id],
			name: "Actions_scoutId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const startingPositions = pgTable("StartingPositions", {
	id: serial().primaryKey().notNull(),
	eventId: integer().notNull(),
	scouterId: text().notNull(),
	matchNumber: text().notNull(),
	teamNumber: integer().notNull(),
	startingPosition: text().notNull(),
	hasPreload: boolean().notNull(),
	showedUp: boolean().notNull(),
	timestamp: text().notNull(),
}, (table) => [
	uniqueIndex("StartingPositions_eventId_matchNumber_teamNumber_key").using("btree", table.eventId.asc().nullsLast().op("text_ops"), table.matchNumber.asc().nullsLast().op("int4_ops"), table.teamNumber.asc().nullsLast().op("text_ops")),
	foreignKey({
			columns: [table.eventId],
			foreignColumns: [events.id],
			name: "StartingPositions_eventId_fkey"
		}).onUpdate("cascade").onDelete("restrict"),
]);

export const seasons = pgTable("Seasons", {
	id: serial().primaryKey().notNull(),
	year: integer().notNull(),
	gameName: text().notNull(),
	createdAt: text().notNull(),
	updatedAt: text().notNull(),
	isActive: boolean().default(false).notNull(),
});

export const prismaMigrations = pgTable("_prisma_migrations", {
	id: varchar({ length: 36 }).primaryKey().notNull(),
	checksum: varchar({ length: 64 }).notNull(),
	finishedAt: timestamp("finished_at", { withTimezone: true, mode: 'string' }),
	migrationName: varchar("migration_name", { length: 255 }).notNull(),
	logs: text(),
	rolledBackAt: timestamp("rolled_back_at", { withTimezone: true, mode: 'string' }),
	startedAt: timestamp("started_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	appliedStepsCount: integer("applied_steps_count").default(0).notNull(),
});

export const users = pgTable("Users", {
	id: serial().primaryKey().notNull(),
	grade: text(),
	isActive: boolean().default(true).notNull(),
	createdAt: text().notNull(),
	updatedAt: text().notNull(),
	firstName: text(),
	isAdmin: boolean().default(false).notNull(),
	lastName: text(),
	team: team(),
	isSignupComplete: boolean().default(false).notNull(),
	clerkId: text().notNull(),
}, (table) => [
	uniqueIndex("Users_clerkId_key").using("btree", table.clerkId.asc().nullsLast().op("text_ops")),
]);
