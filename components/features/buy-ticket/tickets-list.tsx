import React from 'react'
import TicketCard from './ticket-card'
import { asyncFetch } from '@/lib/asyncFetch'
import { EventSingleVenue } from '@/schema/event-schema'
import { EventTicket } from '@/schema/ticket-schema'
import TestTicketCard from './test-ticket-card'

type TicketsListProps = {
    eventSlug: string,
}

export default async function TicketsList({ eventSlug }: TicketsListProps) {

    const res = await asyncFetch.get(`/paradimes/events/${eventSlug}/tickets`, {
        next: { revalidate: 60 }
    })
    
    if(!res.ok) return <></>
    
    const event = await res.json() as EventSingleVenue
    const tickets = event?.event_ticket_types

    if (!tickets) return <></>

    return (
        <div className="grid grid-cols-3 gap-[3rem_0px]">
            {
                tickets.map((ticket) => (
                    <TestTicketCard key={ticket.id} ticket={ticket} event={event} />
                ))
            }
        </div>
    )
}

