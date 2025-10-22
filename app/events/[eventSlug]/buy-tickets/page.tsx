import PageHeader from '@/components/layout/page-header'
import React, { Suspense } from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TicketsList from '@/components/features/buy-ticket/tickets-list'
import TablesList from '@/components/features/buy-ticket/tables-list'
import Link from 'next/link'
import { Venue } from '@/schema/venue-schema'
import { Button } from '@/components/ui/button'

type BuyTicketsProps = {
    params: {
        eventSlug: string
    },
    searchParams: {
        tab: 'tickets' | 'tables'
    }
}

export default async function BuyTickets({ params, searchParams }: BuyTicketsProps) {
    const { tab } = await searchParams
    const { eventSlug } = await params

    const res = await asyncFetch.get(`/paradimes/events/${eventSlug}`, {
        next: { revalidate: 60 }
    })

    if(!res.ok) return <></>

    const event = await res.json()

    return (
        <div className="flex flex-col items-center w-full gap-10 py-10 min-h-screen px-5 lg:px-32">

            <div className="flex flex-col self-start gap-2">
                <h1 className='text-4xl uppercase font-bold'>Buy Tickets for {event.name}</h1>
                <p className='text-white/70'>{event.description}</p>
            </div>
            <div className="flex flex-col w-full h-full flex-1 gap-3">

                <Tabs defaultValue={tab || 'tickets'} className="flex-1 flex flex-col gap-10">
                    <TabsList className='flex w-full lg:w-fit bg-transparent gap-0 rounded-none p-0'>
                        <TabsTrigger value="tickets" asChild>
                            <Button variant={'outline'} asChild>
                                <Link href={`/events/${eventSlug}/buy-tickets?tab=tickets`}>Tickets</Link>
                            </Button>
                        </TabsTrigger>
                        <TabsTrigger value="tables" asChild>
                            <Button variant={'outline'} asChild>

                                <Link href={`/events/${eventSlug}/buy-tickets?tab=tables`}>Tables</Link>
                            </Button>
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="tickets">
                        <Suspense>
                            <TicketsList eventSlug={eventSlug} />
                        </Suspense>
                    </TabsContent>
                    <TabsContent value="tables">
                        <Suspense>
                            <TablesList eventSlug={eventSlug} />
                        </Suspense>
                    </TabsContent>

                </Tabs>
            </div>
        </div>
    )
}



