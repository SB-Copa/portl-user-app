import VenueCard from '@/components/features/venue/venue-card'
import PageHeader from '@/components/layout/page-header'
import { asyncFetch } from '@/lib/asyncFetch'
import { Venue } from '@/schema/venue-schema'
import React from 'react'

type EventVenuesProps = {
    params: {
        eventId: string
    }
}

export default async function EventVenues({ params }: EventVenuesProps) {
    const { eventId } = await params

    const res = await asyncFetch.get(`/admin/events/${eventId}/venues`)

    const event = await res.json()
    const venues = event.venues;

    return (
        <div className="flex flex-col items-center w-full gap-10 py-4">
            <PageHeader title={`${event.name} Venues`} showBackButton />

            <div className="flex flex-col">
                {
                    venues.map((venue: Venue) => (
                        <VenueCard event={event} venue={venue} key={venue.id} />
                    ))
                }
            </div>
        </div>
    )
}
