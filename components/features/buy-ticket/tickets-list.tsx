import React from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import TestTicketCard from './test-ticket-card'
import BuyTicketListWrapper from './buy-ticket-list-wrapper'

type TicketsListProps = {
    eventSlug: string,
}

export default async function TicketsList({ eventSlug }: TicketsListProps) {

    const res = await asyncFetch.get(`/paradimes/events/${eventSlug}/tickets`, {
        next: { revalidate: 60 }
    })

    if (!res.ok) return <></>

    const event = await res.json() as EventSingleVenue
    const tickets = event?.event_ticket_types

    if (!tickets) return <></>

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



