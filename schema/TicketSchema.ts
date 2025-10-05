import { z } from "zod"


export const ticketSchema = z.object({
    id: z.number(),
    quantity: z.number(),
})

export const stepOneSchema = z.object({
    tickets: z.array(ticketSchema),
})

export const stepTwoSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.email(),
    birthDate: z.date(),
    invitedBy: z.string().min(1),
})

export const fullFormSchema = z.intersection(stepOneSchema, stepTwoSchema)