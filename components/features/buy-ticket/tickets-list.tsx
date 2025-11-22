import React from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import TestTicketCard from './test-ticket-card'
import BuyTicketListWrapper from './buy-ticket-list-wrapper'
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { TicketIcon } from 'lucide-react'

type TicketsListProps = {
    eventSlug: string,
}

export default async function TicketsList({ eventSlug }: TicketsListProps) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paradimes/events/${eventSlug}/ticket-types`, {
        credentials: 'include',
    })

    if (!res.ok) return <></>

    const event = await res.json() as EventSingleVenue
    const tickets = event?.event_ticket_types

    if (!tickets || tickets.length === 0) {
        return (
            <Empty className="w-full py-12">
                <EmptyHeader>
                    <EmptyMedia variant="icon">
                        <TicketIcon className="size-6" />
                    </EmptyMedia>
                    <EmptyTitle>No tickets available</EmptyTitle>
                    <EmptyDescription>
                        There are currently no tickets available for this event. Please check back later.
                    </EmptyDescription>
                </EmptyHeader>
            </Empty>
        )
    }

    return (
        <BuyTicketListWrapper >
            {
                tickets.map((ticket) => (
                    <TestTicketCard key={ticket.id} ticket={ticket} event={event} />
                ))
            }
        </BuyTicketListWrapper>
    )
}



