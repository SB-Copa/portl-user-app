import { z } from "zod"


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

export const cartItemSchema = z.object({
    quantity: z.number(),
    event_name: z.string(),
}).extend(eventTicketTypeSchema.pick({
    id: true,
    name: true,
    price: true,
}).shape)


export const ticketSchema = z.object({
    id: z.number(),
    quantity: z.number(),
    price: z.number(),
})

export const stepOneSchema = z.object({
    tickets: z.array(cartItemSchema),
})

export const stepTwoSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    birthDate: z.string(),
    invitedBy: z.string().min(1).optional(),
})

export const fullFormSchema = z.intersection(stepOneSchema, stepTwoSchema)

export type EventTicketType = z.infer<typeof eventTicketTypeSchema>
export type CartItem = z.infer<typeof cartItemSchema>