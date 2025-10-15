import z from "zod";
import { eventTicketTypeSchema } from "./ticket-schema";
import { venueTableNameSchema } from "./venue-schema";

export const cartItemSchema = z.object({
    tickets: z.array(eventTicketTypeSchema),
    tables: z.array(venueTableNameSchema),
})

export const cartTicketGuestSchema = z.object({
    full_name: z.string(),
    age: z.number(),
})


export const cartVenueTableSchema = z.object({
    table_name: z.string(),
    event_name: z.string(),
    event_id: z.number(),
    venue_id: z.number(),
    venue_table_id: z.number(),
    venue_table_name_id: z.number(),
    venue_table_holder_type_id: z.number(),
    legend: z.string(),
    price: z.string(),
    is_primary: z.boolean().optional(),
    guests: z.array(cartTicketGuestSchema).optional(),
    max_capacity: z.number(),
});


export const cartTicketSchema = z.object({
    event_ticket_type_id: z.number(),
    name: z.string(),
    venue_id: z.number(),
    quantity: z.number(),
    event_name: z.string(),
    price: z.string(),
    is_primary: z.boolean().optional(),
    guests: z.array(cartTicketGuestSchema).optional(),
    max_capacity: z.number(),
})

export const stepOneSchema = z.object({
    tickets: z.array(cartTicketSchema),
    tables: z.array(cartVenueTableSchema),
}).refine((data) => {
    return data.tickets.length > 0 || data.tables.length > 0;
}, {
    message: "You must have at least one ticket or table in your cart",
    path: ["tickets", "tables"], // This will show the error on both fields
})

export const stepTwoSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    birthDate: z.string(),
    invitedBy: z.string().min(1).optional(),
})

export const fullFormSchema = z.intersection(stepOneSchema, stepTwoSchema)

export type CartTicket = z.infer<typeof cartTicketSchema>
export type CartVenueTable = z.infer<typeof cartVenueTableSchema>
export type CartItem = z.infer<typeof cartItemSchema>
