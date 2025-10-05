import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { dummyEvents } from '@/dummy/events'
import { Event } from '@/schema/EventSchema'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type EventCardProps = {
    event: Event
}

export default function EventCard({ event }: EventCardProps) {
    return (
        <Card className='p-0 gap-0 overflow-clip'>
            <CardContent className='bg-blue-500 p-0'>
                <Image className='aspect-video w-full h-64 object-cover' src={event.menu_images || dummyEvents[0].image} alt={event.name} width={400} height={300} />
                <div className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>

                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col">
                            <h3 className='text-lg font-bold'>{event.name}</h3>
                            <p className='text-sm'>{event.capacity} pax</p>
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
                                Date and Time
                            </p>

                            <p>|</p>

                            <p>Location</p>

                        </div>

                        <div className="flex gap-2 w-full">
                            <Button className='border border-white text-white w-1/2 px-4 py-2 rounded hover:bg-white hover:text-black transition-colors'>Save</Button>
                            <Link href={`/events/${event.id}/buy-tickets`} className='w-1/2'>
                                <Button className='bg-white text-black w-full px-4 py-2 rounded hover:bg-gray-100 transition-colors'>Buy Ticket</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
