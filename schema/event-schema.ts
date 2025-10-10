import { z } from "zod";
import { eventTicketTypeSchema } from "./ticket-schema";

// export const EventTypeSchema = z.object({
//   id: z.number(),
//   type: z.string(),
//   created_at: z.string(),
//   updated_at: z.string(),
// });

export const EventSchema = z.object({
  id: z.number(),
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
  // event_type: EventTypeSchema,
  event_ticket_types: z.array(eventTicketTypeSchema),
});


export type Event = z.infer<typeof EventSchema>;
// export type EventType = z.infer<typeof EventTypeSchema>;