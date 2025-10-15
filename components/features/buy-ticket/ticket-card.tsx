'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import { EventTicket } from '@/schema/ticket-schema'
import React from 'react'

type TicketCardProps = {
    ticket: EventTicket
    eventName: string
    venueId: string
}

export default function TicketCard({ ticket, eventName, venueId }: TicketCardProps) {
    const { addTicket, decreaseTicketQuantity, getTicketCartItem } = useCart()

    const handleRemoveTicket = () => {
        decreaseTicketQuantity(ticket.id)
    }

    const handleAddTicket = () => {
        const currentQuantity = cartTicket?.quantity || 0
        if (currentQuantity < ticket.available_tickets) {
            addTicket({
                event_ticket_type_id: ticket.id,
                quantity: 1,
                price: ticket.price,
                event_name: eventName,
                name: ticket.name,
                venue_id: Number(venueId),
                max_capacity: 1,
            })
        }
    }

    const cartTicket = getTicketCartItem(ticket.id)

    const isAtCapacity = (cartTicket?.quantity || 0) >= ticket.available_tickets

    return (
        <Card className='p-0 gap-0 overflow-clip border-none outline-2 outline-[#2d2c2c]'>
            <CardContent className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>
                <div className="flex flex-col gap-10">
                    <div className="flex flex-col gap-1">
                        <h3 className='font-bold text-xl'>{ticket.name}</h3>
                        <p>
                            <span className='font-bold'>
                                PHP {Number(ticket.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </p>
                        <p className='italic text-xs text-white/50'>{ticket.description}</p>
                    </div>

                    <div className="flex flex-col">
                        <p className='text-sm'>Quantity</p>

                        <div className="flex items-center w-full justify-between">
                            <Button className='text-2xl' variant={'ghost'} onClick={handleRemoveTicket}>-</Button>
                            <p className='text-lg'>{cartTicket?.quantity || 0}</p>
                            <Button 
                                className={`text-2xl ${isAtCapacity && 'opacity-50 cursor-not-allowed'}` }
                                variant={'ghost'} 
                                onClick={handleAddTicket}
                                disabled={isAtCapacity}
                            >+</Button>
                        </div>
                        <p className='text-xs text-white/50 mt-1'>
                            {ticket.available_tickets - (cartTicket?.quantity || 0)} tickets remaining
                        </p>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
