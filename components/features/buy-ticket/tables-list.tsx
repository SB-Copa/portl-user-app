import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import React from 'react'
import TestTableCard from './test-table-card'
import BuyTicketListWrapper from './buy-ticket-list-wrapper'

type TablesListProps = {
    eventSlug: string
}

export default async function TablesList({ eventSlug }: TablesListProps) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paradimes/events/${eventSlug}/tables`, {
        credentials: 'include',
    })

    if (!res.ok) return <></>

    const event = await res.json() as EventSingleVenue

    if (!event) return

    const venueTableNames = event.venues.venue_table_names


    return (
        <div className="flex flex-col w-full h-full flex-1 gap-3">
            <BuyTicketListWrapper desktopClassName='grid-cols-2'>
                {
                    venueTableNames.map((venueTableName) => (
                        <TestTableCard key={venueTableName.id} event={event} venueTableName={venueTableName} />
                    ))
                }
            </BuyTicketListWrapper>
        </div>
    )
}
