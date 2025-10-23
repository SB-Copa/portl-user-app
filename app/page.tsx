import React from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { Event } from '@/schema/event-schema'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { eventImages } from '@/dummy/images'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import EventCard from '@/components/features/event/event-card'

export const dynamic = 'force-dynamic'

export default async function TenantHomepage() {

  const res = await asyncFetch.get('/paradimes/events')

  if (!res.ok) return <></>

  const { data: events } = await res.json()

  if (!events) return <></>

  return (
    <div className="flex flex-col items-center w-full">

      <div className="w-full h-[60vh] bg-white/10">
        <Image src={eventImages[2]} alt="Banner" width={400} height={300} className='object-cover w-full h-full' />

      </div>

      <div className="flex flex-col p-10 px-32 w-full gap-10">
        <div className="flex flex-col lg:flex-row h-full gap-10">

          <div className="flex flex-col lg:w-[50%] lg:sticky lg:top-24 self-start lg:text-right gap-5">
            <h2 className='text-white text-4xl uppercase font-bold'>Events for you</h2>

            <Link href="/events">
              <Button variant={'outline'}>
                <span>View all events</span>
                <ArrowRight />
              </Button>
            </Link>

          </div>

          <div className="flex flex-col gap-12 max-w-full overflow-auto items-start lg:w-[50%]">
            {[...events, ...events, ...events]?.map((event: Event, index: number) => (
              <EventCard key={index} event={event} />
            ))}
          </div>

        </div>
      </div>


    </div>
  )
}
