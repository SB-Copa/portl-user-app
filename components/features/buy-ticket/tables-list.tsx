import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import React from 'react'
import TestTableCard from './test-table-card'
import BuyTicketListWrapper from './buy-ticket-list-wrapper'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { Martini } from 'lucide-react'

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

    if (!venueTableNames || venueTableNames.length === 0) {
        return (
            <div className="flex flex-col w-full h-full flex-1 gap-3">
                <Empty className="w-full py-12">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <Martini className="size-6" />
                        </EmptyMedia>
                        <EmptyTitle>No tables available</EmptyTitle>
                        <EmptyDescription>
                            There are currently no tables available for this event. Please check back later.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            </div>
        )
    }

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
