import EventCard from '@/components/features/event/event-card'
import { Button } from '@/components/ui/button'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import {  List, Ticket } from 'lucide-react'
import React from 'react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function Events() {
  const res = await asyncFetch.get('/paradimes/events')
  if (!res.ok) return <></>
  const { data: events } = await res.json()

  return (
    <div className="flex flex-col w-full gap-10 px-5 lg:px-32 py-10">

      <h1 className='text-4xl uppercase font-bold'>All Events</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-5">
        {
          [...events, ...events]?.map((event: Event, index: number) => (
            <EventCard key={index} event={event} >

              <div className="flex w-full gap-2">
                <Button variant={'outline'} asChild>
                  <Link href={`/events/${event.slug}`}>
                    <List />
                    <span> View Details</span>
                  </Link>
                </Button>

                <Button variant={'outline'} asChild>
                  <Link href={`/events/${event.slug}/buy-tickets`} >
                    <Ticket />
                    <span> Buy Tickets</span>
                  </Link>
                </Button>
              </div>

            </EventCard>
          ))
        }
      </div>
    </div>
  )
}
