'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useCart from '@/hooks/use-cart'
import { CartTicket, CartVenueTable } from '@/schema/cart-schema'
import { Trash } from 'lucide-react'
import React from 'react'

export default function CartList() {
    const { ticketsByEvent, tablesByEvent } = useCart()

    // const calculateTicketTotalAmountPerEvent = (items: CartTicket[]) => {
    //     return items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    // }

    const calculateTableTotalAmountPerEvent = (items: CartVenueTable[]) => {
        return items.reduce((acc, item) => acc + parseFloat(item.price), 0)
    }

    return (
        <div className='flex flex-col gap-10'>
            {
                Object.keys(ticketsByEvent).length > 0 && (
                    <>
                        <h2>Tickets</h2>

                        {
                            Object.entries(ticketsByEvent).map(([eventName, items]) => (
                                <div key={eventName} className='flex flex-col gap-4'>
                                    <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {items.length} items</span></h3>

                                    {
                                        items.map((item) => (
                                            <CartTicketItem key={item.event_ticket_type_id} item={item} />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </>
                )
            }

            {
                Object.keys(tablesByEvent).length > 0 && (
                    <>
                        <h2>Tables</h2>

                        {
                            Object.entries(tablesByEvent).map(([eventName, items]) => (
                                <div key={eventName} className='flex flex-col gap-4'>


                                    <div className="flex justify-between items-end">
                                        <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {items.length} items</span></h3>

                                        <p className='text-sm text-white/50'>
                                            PHP {calculateTableTotalAmountPerEvent(items).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>

                                    </div>


                                    <div className="flex flex-col gap-2">
                                        {
                                            items.map((item) => (
                                                <CartTableItem key={item.venue_table_id} item={item} />
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </>
                )
            }

        </div>
    )
}


function CartTicketItem({ item }: { item: CartTicket }) {
    const { increaseTicketQuantity, decreaseTicketQuantity, removeTicket } = useCart()
    return (
        <Card className='p-0 gap-0 overflow-clip border-none outline-2 outline-[#2d2c2c]'>
            <CardContent className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>
                <div className="flex w-full justify-between gap-10 items-center">
                    <div className="flex flex-col gap-1">
                        <h4 className='text-base'>{item.name}</h4>
                        <p className='font-bold text-sm'>
                            PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>

                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <Button variant='ghost' onClick={() => decreaseTicketQuantity(item.event_ticket_type_id)}>-</Button>

                            <p className='text-sm'>{item.quantity}</p>

                            <Button variant='ghost' onClick={() => increaseTicketQuantity(item.event_ticket_type_id)}>+</Button>
                        </div>

                        <Button variant='ghost' onClick={() => removeTicket(item.event_ticket_type_id)}><Trash /></Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}

function CartTableItem({ item }: { item: CartVenueTable }) {

    const { removeTable } = useCart()

    return (
        <Card className='p-0 gap-0 overflow-clip border-none outline-2 outline-[#2d2c2c]'>
            <CardContent className='flex flex-col gap-10 bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>

                <div className="flex flex-col">
                    <h2 className='text-xl font-bold'>{item.table_name}</h2>
                    <p><span className='font-bold'>PHP {parseFloat(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> / {item.max_capacity} pax</p>
                    <p className='italic text-sm'>{item.legend}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className='text-white/50 text-sm'>Choose Table</h3>

                    <div className="flex flex-wrap gap-2">
                        {/* {
                            item.venue_tables.map((table) => (
                                <TableCardToggle event={event} table={table} tableRequirements={tableRequirements} key={table.id} />
                            ))
                        } */}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}