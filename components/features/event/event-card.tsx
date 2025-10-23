import { Badge } from '@/components/ui/badge'
import { eventImages } from '@/dummy/images'
import { Event } from '@/schema/event-schema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type EventCardProps = {
    event: Event
    className?: string
    children?: React.ReactNode
}

export default function EventCard({ event, className, children }: EventCardProps) {

    return (
        <div className={twMerge("flex flex-col gap-4 group", className)}>
            <Link href={`/events/${event.slug}`} className={twMerge("flex flex-col gap-4 group", className)}>

                <div className="w-full relative h-[35vh] border border-white/20 rounded overflow-clip ">
                    <div className="flex rounded overflow-clip  absolute inset-0 z-10 grayscale-75 group-hover:scale-[101%] group-hover:grayscale-0 transition-all duration-400">
                        <Image src={eventImages[0]} alt={event.name} width={400} height={300} className='object-cover w-full h-full -z-1' />
                    </div>

                    <div className="absolute inset-0  bg-[radial-gradient(ellipse_at_top_left,transparent_0%,_rgba(0,0,0,.9)_75%)] z-20">

                    </div>
                    <Badge className='hidden lg:block ml-auto h-fit absolute bottom-4 left-4 z-30'>
                        {event.event_type.type}
                    </Badge>
                </div>



                <div className="flex flex-col gap-2 text-white/90 group-hover:text-white transition-all duration-400">
                    <h2 className=' text-2xl font-medium'>{event.name}</h2>
                    <p className='text-white/70'>{event.description}</p>



                    <h2 className=' font-medium mt-auto'>
                        {new Date().toLocaleString('en-US', { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false })}
                    </h2>
                </div>


            </Link>

            {children}
        </div>
    )
}

