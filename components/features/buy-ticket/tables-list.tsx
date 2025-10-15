import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import React from 'react'
import TableCard from './table-card'

type TablesListProps = {
    eventId: string
    venueId: string
}

export default async function TablesList({ eventId, venueId }: TablesListProps) {
    const res = await asyncFetch.get(`/admin/events/${eventId}/venues/${venueId}/tables`)
    const event = await res.json() as Event
    const venue = event.venues[0]
    const venueTableNames = venue.venue_table_names

    return (
        <div className="flex flex-col w-full h-full flex-1 gap-3">

            {
                <div className="flex flex-col gap-2">
                    {
                        venueTableNames.map((venueTableName) => (
                            <TableCard key={venueTableName.id} event={event} venueTableName={venueTableName} />
                        ))
                    }
                </div>
            }

        </div>
    )
}
