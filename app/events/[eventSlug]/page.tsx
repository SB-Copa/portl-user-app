import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { eventImages } from '@/dummy/images'
import { asyncFetch } from '@/lib/asyncFetch'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type EventVenuesProps = {
    params: {
        eventSlug: string
    }
}

export default async function EventLandingPage({ params }: EventVenuesProps) {
    const { eventSlug } = await params

    const res = await asyncFetch.get(`/paradimes/events/${eventSlug}`)
    const event = await res.json()

    return (
        <div className="flex flex-col gap-10 p-4 lg:p-10 lg:px-32">

            <div className="flex flex-col lg:flex-row gap-10 flex-1">

                <div className="flex flex-col flex-1 gap-2">
                    <div className="flex gap-2">
                        <Badge className='capitalize'>
                            {event.event_status.status.toLowerCase()}
                        </Badge>

                        <Badge className='capitalize'>
                            {event.event_type.type.toLowerCase()}
                        </Badge>
                    </div>
                    <h1 className='text-4xl uppercase font-medium'>{event.name}</h1>
                    <p className='text-white/70 text-sm'>{event.description}</p>
                </div>

                <div className="flex flex-col flex-1 lg:items-end">
                    <Button variant={'outline'} className='w-fit mt-auto' asChild>
                        <Link href={`/events/${eventSlug}/buy-tickets`}>    
                            <span>Buy Tickets</span>
                            <ArrowRight />
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-5">
                <div className="lg:w-[60%]">
                    <Image src={eventImages[1]} alt={event.name} width={400} height={300} className='object-cover w-full h-full' />
                </div>
                <div className="lg:w-[40%]">
                    <Image src={eventImages[2]} alt={event.name} width={400} height={300} className='object-cover w-full h-full' />
                </div>
            </div>

        </div>
    )
}
