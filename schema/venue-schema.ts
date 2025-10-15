import z from "zod";
import { regionSchema } from "./address-schema";
import { provinceSchema } from "./address-schema";
import { barangaySchema } from "./address-schema";

// Nested schemas
const venueTableSchema = z.object({
    id: z.number(),
    venue_id: z.number(),
    venue_table_status_id: z.number(),
    venue_table_name_id: z.number(),
    capacity: z.number(),
    legend: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

const venueTableRequirementSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    price: z.string(),
    capacity: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
});


export const venueTableNameSchema = z.object({
    id: z.number(),
    name: z.string(),
    venue_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    venue_tables: z.array(venueTableSchema),
    venue_table_requirements: z.array(venueTableRequirementSchema),
});

const venueStatusSchema = z.object({
    id: z.number(),
    status: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
});

const pivotSchema = z.object({
    event_id: z.number(),
    venue_id: z.number(),
});


export const venueSchema = z.object({
    id: z.number(),
    name: z.string(),
    address: z.string().nullable(),
    region_id: z.string(),
    province_id: z.string(),
    municipality_id: z.string(),
    barangay_id: z.string(),
    contact_number: z.string(),
    email: z.string().nullable(),
    websites: z.string().nullable(),
    capacity: z.number(),
    user_count: z.number(),
    table_count: z.number(),
    menu_images: z.string().nullable(),
    banner_images: z.string().nullable(),
    carousel_images: z.string().nullable(),
    menu: z.string().nullable(),
    about: z.string().nullable(),
    venue_status_id: z.number(),
    created_at: z.string(),
    updated_at: z.string(),
    pivot: pivotSchema.optional(),
    venue_table_names: z.array(venueTableNameSchema),
    venue_status: venueStatusSchema,
    region: regionSchema,
    province: provinceSchema,
    city_municipality: z.any().nullable(),
    barangay: barangaySchema,
});

export type Venue = z.infer<typeof venueSchema>;
export type VenueTable = z.infer<typeof venueTableSchema>;
export type VenueTableName = z.infer<typeof venueTableNameSchema>;
export type VenueTableRequirement = z.infer<typeof venueTableRequirementSchema>;
export type VenueStatus = z.infer<typeof venueStatusSchema>;
