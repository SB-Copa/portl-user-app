import { Card, CardContent } from '@/components/ui/card'
import { eventImages } from '@/dummy/images'
import { Event } from '@/schema/event-schema'
import { Venue } from '@/schema/venue-schema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type VenueCardProps = {
    event: Event
    venue: Venue
}

export default function VenueCard({ event, venue }: VenueCardProps) {
  return (
    <Link href={`/events/${event.id}/venues/${venue.id}/buy-tickets`}>
        <Card className='p-0 gap-0 overflow-clip border-2 border-[#2d2c2c]'>
                <CardContent className='p-0 text-secondary-foreground bg-secondary'>
                    <Image className='aspect-video w-full h-64 object-cover' src={eventImages[1]} alt={venue.name} width={400} height={300} />

                    <div className="flex flex-col p-4">
                        <h2>{venue.name}</h2>
                    </div>
                </CardContent>
            </Card>
    </Link>
  )
}
