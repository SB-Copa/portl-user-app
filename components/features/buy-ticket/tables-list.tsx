import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import React from 'react'
import TableCard from './table-card'
import TestTableCard from './test-table-card'

type TablesListProps = {
    eventSlug: string
}

export default async function TablesList({ eventSlug }: TablesListProps) {
    const res = await asyncFetch.get(`/paradimes/events/${eventSlug}/tables`, {
        next: { revalidate: 60 }
    })

    if(!res.ok) return <></>
    
    const event = await res.json() as EventSingleVenue

    if (!event) return

    const venueTableNames = event.venues.venue_table_names


    return (
        <div className="flex flex-col w-full h-full flex-1 gap-3">

            {
                <div className="grid grid-cols-2 gap-[3rem_0px]">
                    {
                        venueTableNames.map((venueTableName) => (
                            <TestTableCard key={venueTableName.id} event={event} venueTableName={venueTableName} />
                        ))
                    }
                </div>
            }

        </div>
    )
}
