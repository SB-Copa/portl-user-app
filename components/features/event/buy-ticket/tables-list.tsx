import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import React from 'react'

type TablesListProps = {
    slug: string
}

export default async function TablesList({ slug }: TablesListProps) {
    const res = await asyncFetch.get(`/admin/events/${slug}/venues`)
    const event = await res.json() as Event
    // const tables = event.venues[0].venue_table_names


    console.log(event)

    return (
        <div className="flex flex-col w-full h-full flex-1 gap-3">
            {
                // tickets.map((ticket) => (
                //     <TicketCard key={ticket.id} ticket={ticket} eventName={event.name} />
                // ))
            }
        </div>
    )
}
