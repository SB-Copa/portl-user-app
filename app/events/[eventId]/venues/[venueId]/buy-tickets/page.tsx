import PageHeader from '@/components/layout/page-header'
import React from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TicketsList from '@/components/features/buy-ticket/tickets-list'
import TablesList from '@/components/features/buy-ticket/tables-list'
import Link from 'next/link'

type BuyTicketsProps = {
    params: {
        eventId: string
        venueId: string
    },
    searchParams: {
        tab: 'tickets' | 'tables'
    }
}

export default async function BuyTickets({ params, searchParams }: BuyTicketsProps) {
    const { tab } = await searchParams
    const { eventId, venueId } = await params

    const res = await asyncFetch.get(`/admin/events/${eventId}/venues/${venueId}`)
    const event = await res.json() as Event

    return (
        <div className="flex flex-col items-center w-full gap-10 py-4 min-h-screen">
            <PageHeader title={event.name} showBackButton />

            <div className="flex flex-col w-full h-full flex-1 gap-3">

                <Tabs defaultValue={tab || 'tickets'} className="flex-1 w-full flex flex-col gap-10">
                    <TabsList className='flex w-full bg-transparent gap-0 rounded-none p-0'>
                        <TabsTrigger value="tickets" asChild><Link href={`/events/${eventId}/venues/${venueId}/buy-tickets?tab=tickets`}>Tickets</Link></TabsTrigger>
                        <TabsTrigger value="tables" asChild><Link href={`/events/${eventId}/venues/${venueId}/buy-tickets?tab=tables`}>Tables</Link></TabsTrigger>
                    </TabsList>

                    <TabsContent value="tickets">
                        <TicketsList eventId={eventId} venueId={venueId} />
                    </TabsContent>
                    <TabsContent value="tables">
                        <TablesList eventId={eventId} venueId={venueId} />
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}



