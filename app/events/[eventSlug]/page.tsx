import { Badge } from '@/components/ui/badge'
import { eventImages } from '@/dummy/images'
import { asyncFetch } from '@/lib/asyncFetch'
import { CalendarIcon, Clock, PinIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

type EventVenuesProps = {
    params: {
        eventSlug: string
    }
}

export default async function EventLandingPage({ params }: EventVenuesProps) {
    const { eventSlug } = await params

    const res = await asyncFetch.get(`/events/${eventSlug}`)
    const event = await res.json()

    console.log(event)

    return (
        <div className="flex flex-col items-center w-full gap-10">
            <div className="w-full min-h-[60vh] h-[60vh] bg-white/10 flex flex-col items-center justify-center relative">
                <Image src={eventImages[0]} alt={event.name} width={400} height={300} className='object-cover w-full h-full' />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 z-50"></div>
            </div>

            {/* <div className="flex flex-col p-10 px-32 w-full gap-10">
                <div className="flex flex-col lg:flex-row h-full gap-10">

                    <div className="flex flex-col lg:w-[40%]">
                        <h2 className='text-white text-4xl uppercase font-bold  sticky top-24 self-start'>Events for you</h2>

                        <Link href={`/events/${eventSlug}/buy-tickets`}>
                            <Button variant={'link'} className='px-0'>
                                View all tickets
                            </Button>
                        </Link>

                    </div>

                    <div className="flex flex-col gap-2 max-w-full overflow-auto items-start lg:w-[60%]">
                        <TicketCard ticket={ticket} />
                    </div>

                </div>
            </div> */}


            <div className="flex flex-col p-10 px-32 gap-2">

                <div className="flex gap-2">
                    <Badge>Tag</Badge>
                    <Badge>Tag</Badge>
                    <Badge>Tag</Badge>
                </div>

                <h1 className='text-5xl'>{event.name}</h1>

                <div className="flex items-center gap-5">

                    <div className="flex gap-2 items-center">
                        <CalendarIcon className='w-4 h-4'/>
                        <p>Oct 31, 2025</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <PinIcon className='w-4 h-4'/>
                        <p>Venue</p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <Clock className='w-4 h-4'/>
                        <p>7:00 PM</p>
                    </div>

                </div>
            </div>


        </div>
    )
}
