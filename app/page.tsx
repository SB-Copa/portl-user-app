import React from 'react'
import EventCard from '@/components/features/event/event-card'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'

export default async function Homepage() {

  const res = await asyncFetch.get('/events')

  if (!res.ok) return <></>

  const { data: events } = await res.json()


  return (
    <div className="flex flex-col items-center w-full gap-10 py-4">
      <div className="flex flex-col w-full gap-2">
        <h2 className='text-white text-lg font-bold'>Events for you</h2>

        <div className="flex gap-5 w-full max-w-full overflow-auto py-4 items-start">
          {events.map((event: Event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>

      </div>
    </div>
  )
}
