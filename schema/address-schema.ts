import z from "zod";

export const regionSchema = z.object({
    id: z.number(),
    psgcCode: z.string(),
    regDesc: z.string(),
    regCode: z.string(),
});

export const provinceSchema = z.object({
    id: z.number(),
    psgcCode: z.string(),
    provDesc: z.string(),
    regCode: z.string(),
    provCode: z.string(),
});

export const barangaySchema = z.object({
    id: z.number(),
    brgyCode: z.string(),
    brgyDesc: z.string(),
    regCode: z.string(),
    provCode: z.string(),
    citymunCode: z.string(),
});

export type Region = z.infer<typeof regionSchema>;
export type Province = z.infer<typeof provinceSchema>;
export type Barangay = z.infer<typeof barangaySchema>;