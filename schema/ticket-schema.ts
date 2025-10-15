import { z } from "zod"
import { cartItemSchema } from "./cart-schema"


export const eventTicketTypeSchema = z.object({
    id: z.number(),
    event_id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    available_tickets: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
})

export type EventTicket = z.infer<typeof eventTicketTypeSchema>
export type CartItem = z.infer<typeof cartItemSchema>