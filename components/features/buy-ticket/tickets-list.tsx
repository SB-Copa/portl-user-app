import React from 'react'
import TicketCard from './ticket-card'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'

type TicketsListProps = {
    eventId: string,
    venueId: string
}

export default async function TicketsList({ eventId, venueId }: TicketsListProps) {

    const res = await asyncFetch.get(`/admin/events/${eventId}/tickets`)
    const event = await res.json() as Event
    const tickets = event.event_ticket_types

    return (
        <div className="flex flex-col w-full h-full flex-1 gap-3">
            {
                tickets.map((ticket) => (
                    <TicketCard key={ticket.id} ticket={ticket} eventName={event.name} venueId={venueId} />
                ))
            }
        </div>
    )
}
