import { z } from "zod";
import { eventTicketTypeSchema } from "./ticket-schema";
import { venueSchema } from "./venue-schema";

export const eventTypeSchema = z.object({
  id: z.number(),
  type: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const eventSchema = z.object({
  id: z.number(),
  slug: z.string().optional(),
  event_unique_id: z.string(),
  name: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  about: z.string().nullable(),
  is_recurring: z.boolean(),
  capacity: z.number(),
  menu_images: z.any().nullable(),
  banner_images: z.any().nullable(),
  carousel_images: z.any().nullable(),
  event_type_id: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  event_type: eventTypeSchema,
  event_ticket_types: z.array(eventTicketTypeSchema),
  venues: z.array(venueSchema).or(venueSchema),
});

export const eventSingleVenueSchema = eventSchema.extend({
  venues: venueSchema,
});

export type Event = z.infer<typeof eventSchema> | z.infer<typeof eventSchema>;
export type EventSingleVenue = z.infer<typeof eventSingleVenueSchema>;
export type EventType = z.infer<typeof eventTypeSchema>;