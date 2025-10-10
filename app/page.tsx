import { dummyEvents } from '@/dummy/events'
import React from 'react'
import Image from 'next/image'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import EventCard from '@/components/features/event/event-card'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
// import { Event } from '@/schema/EventSchema'



export default async function Homepage() {

  const res = await asyncFetch.get('/admin/events')

  if (!res.ok) return <></>

  const { data: events } = await res.json()

  return (
    <div className="flex flex-col items-center w-full gap-10 py-4">
      <div className="flex justify-between items-center w-full">
        <h1 className='text-lg font-bold'>Welcome, User</h1>

        <div className="flex">
          <button className='bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors'>
            Login
          </button>
        </div>
      </div>


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
