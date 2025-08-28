import { relations } from "drizzle-orm/relations";
import { seasons, events, alternateScoutData, users, fieldImages, matchComments, matchSchedule, pitScoutImages, pitScouting, actions, startingPositions } from "./schema.js";

export const eventsRelations = relations(events, ({ one, many }) => ({
	season: one(seasons, {
		fields: [events.seasonId],
		references: [seasons.id]
	}),
	alternateScoutData: many(alternateScoutData),
	matchComments: many(matchComments),
	matchSchedules: many(matchSchedule),
	pitScoutings: many(pitScouting),
	actions: many(actions),
	startingPositions: many(startingPositions),
}));

export const seasonsRelations = relations(seasons, ({ many }) => ({
	events: many(events),
	fieldImages: many(fieldImages),
	pitScoutImages: many(pitScoutImages),
}));

export const alternateScoutDataRelations = relations(alternateScoutData, ({ one }) => ({
	event: one(events, {
		fields: [alternateScoutData.eventId],
		references: [events.id]
	}),
	user: one(users, {
		fields: [alternateScoutData.scoutId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({ many }) => ({
	alternateScoutData: many(alternateScoutData),
	matchComments: many(matchComments),
	actions: many(actions),
}));

export const fieldImagesRelations = relations(fieldImages, ({ one }) => ({
	season: one(seasons, {
		fields: [fieldImages.seasonId],
		references: [seasons.id]
	}),
}));

export const matchCommentsRelations = relations(matchComments, ({ one }) => ({
	event: one(events, {
		fields: [matchComments.eventId],
		references: [events.id]
	}),
	user: one(users, {
		fields: [matchComments.scoutId],
		references: [users.id]
	}),
}));

export const matchScheduleRelations = relations(matchSchedule, ({ one }) => ({
	event: one(events, {
		fields: [matchSchedule.eventId],
		references: [events.id]
	}),
}));

export const pitScoutImagesRelations = relations(pitScoutImages, ({ one }) => ({
	season: one(seasons, {
		fields: [pitScoutImages.seasonId],
		references: [seasons.id]
	}),
}));

export const pitScoutingRelations = relations(pitScouting, ({ one }) => ({
	event: one(events, {
		fields: [pitScouting.eventId],
		references: [events.id]
	}),
}));

export const actionsRelations = relations(actions, ({ one }) => ({
	event: one(events, {
		fields: [actions.eventId],
		references: [events.id]
	}),
	user: one(users, {
		fields: [actions.scoutId],
		references: [users.id]
	}),
}));

export const startingPositionsRelations = relations(startingPositions, ({ one }) => ({
	event: one(events, {
		fields: [startingPositions.eventId],
		references: [events.id]
	}),
}));