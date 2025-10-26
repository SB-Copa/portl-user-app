import React from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import TestTicketCard from './test-ticket-card'
import BuyTicketListWrapper from './buy-ticket-list-wrapper'

type TicketsListProps = {
    eventSlug: string,
}

export default async function TicketsList({ eventSlug }: TicketsListProps) {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paradimes/events/${eventSlug}/tickets`, {
        credentials: 'include',
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



