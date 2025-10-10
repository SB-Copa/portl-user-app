import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { eventImages } from '@/dummy/images'
import { Event } from '@/schema/event-schema'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type EventCardProps = {
    event: Event
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <Card className='p-0 gap-0 overflow-clip min-w-3/4 max-w-3/4 border-2 border-[#2d2c2c]'>
            <CardContent className=' p-0'>
                <Image className='aspect-video w-full h-64 object-cover' src={eventImages[0]} alt={event.name} width={400} height={300} />
                <div className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <h3 className='text-lg font-bold'>{event.name}</h3>
                            {/* <p className='text-sm'>{event.tickets[0].pricing.pax} pax</p> */}
                        </div>

                        <div className="flex gap-2 text-sm">

                            <p>
                                {/* {new Date(event.dateTime).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                }).replace(",", "")} */}
                                {/* Date and Time */}
                            </p>

                            {/* <p>|</p> */}

                            {/* <p>Location</p> */}

                        </div>

                        <div className="flex gap-2 w-full">
                            <Link href={`/events/${event.id}`} className='w-1/2'>
                                <Button className='border border-white text-white w-full px-4 py-2 rounded hover:bg-white hover:text-black transition-colors'>View Event</Button>
                            </Link>
                            <Link href={`/events/${event.id}/buy-tickets`} className='w-1/2'>
                                <Button className='bg-white text-black w-full px-4 py-2 rounded hover:bg-gray-100 transition-colors'>
                                    <span>Buy Ticket</span>
                                    <ArrowRight />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
