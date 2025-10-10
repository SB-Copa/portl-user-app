'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useCart from '@/hooks/use-cart'
import { EventTicketType } from '@/schema/ticket-schema'
import React from 'react'

type TicketCardProps = {
    ticket: EventTicketType
    eventName: string
}

export default function TicketCard({ ticket, eventName }: TicketCardProps) {
    const { addToCart, decreaseQuantity, getCartItem } = useCart()

    const handleRemoveTicket = () => {
        decreaseQuantity(ticket.id)
    }

    const handleAddTicket = () => {
        addToCart({
            id: ticket.id,
            quantity: 1,
            price: ticket.price,
            event_name: eventName,
            name: ticket.name
        })
    }

    const cartTicket = getCartItem(ticket.id)

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
                            <Button className='text-2xl' variant={'ghost'} onClick={handleAddTicket}>+</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
