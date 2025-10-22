import React from 'react'
import EventCard from '@/components/features/event/event-card'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import { Card, CardContent } from '@/components/ui/card'

export default async function TenantHomepage() {

  const res = await asyncFetch.get('/events')

  if (!res.ok) return <></>

  const { data: events } = await res.json()


  console.log(events)

  return (
    <div className="flex flex-col items-center w-full">

      <div className="w-full min-h-[60vh] bg-white/10">

      </div>



      <div className="flex flex-col p-10 w-full gap-10">
        <div className="flex h-full gap-10">
          <h2 className='text-white text-4xl uppercase font-bold w-[40%] sticky top-24 self-start'>Events for you</h2>

          <div className="flex flex-col gap-2 max-w-full overflow-auto items-start w-[60%]">
            {Array.from({ length: 10 }).map((_, index) => (
              <HomepageEventCard key={index} />
            ))}
          </div>

        </div>
      </div>


    </div>
  )
}

type HomepageEventCardProps = {
  event?: Event
}

const HomepageEventCard = ({ event }: HomepageEventCardProps) => {

  return (
    <Card className='w-full p-0 overflow-clip border-[#2d2c2c] rounded-md'>
      <CardContent className='w-full flex p-0 bg-black relative '>
        <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff38] via-[#0a0a0a] to-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

        <div className="h-64 w-64 bg-white/10"></div>

        <div className="flex flex-col p-4 bg-gradient-to-tl w-full from-[#ffffff30] via-[#0a0a0a] to-[#0a0a0a]">
          <h3 className='text-white text-lg font-bold'>{event?.name || 'Event Name'}</h3>
          <p className='text-white text-sm'>{event?.description || 'Event Description'}</p>
        </div>
      </CardContent>
    </Card>
  )
}