'use client'
import TableCard from '@/components/features/buy-ticket/table-card'
import PageHeader from '@/components/layout/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useCart from '@/hooks/use-cart'
import { asyncFetch } from '@/lib/asyncFetch'
import { CartTicket, CartVenueTable } from '@/schema/cart-schema'
import { Event } from '@/schema/event-schema'
import { Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export default function CartList() {
    const { ticketsByEvent, tablesByEvent } = useCart()

    // const calculateTicketTotalAmountPerEvent = (items: CartTicket[]) => {
    //     return items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    // }

    // const calculateTableTotalAmountPerEvent = (items: CartVenueTable[]) => {
    //     return items.reduce((acc, item) => acc + parseFloat(item.price), 0)
    // }

    // const test = Object.entries(tablesByEvent).reduce((acc, [eventName, items]) => {
    //     acc[eventName] = items.reduce((acc, item) => acc + parseFloat(item.price), 0)
    //     return acc
    // }, {} as Record<string, number>)


    // const groupedtables = Object.entries(tablesByEvent).reduce((acc, [eventName, items]) => {
    //     if (!acc[eventName]) {
    //         acc[eventName] = {}
    //     }

    //     acc[eventName] = items.reduce((acc, item) => {

    //         if (!acc[item.table_name]) {
    //             acc[item.table_name] = []
    //         }

    //         acc[item.table_name].push(item)

    //         return acc

    //     }, {} as Record<string, CartVenueTable[]>)

    //     return acc
    // }, {} as Record<string, Record<string, CartVenueTable[]>>);

    // return <></>


    return (
        <div className='flex flex-col gap-10 w-full'>
            <PageHeader title={'Cart'} showBackButton />

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

                        <CartTableItem eventId={Object.values(tablesByEvent)[0][0].event_id} venueId={Object.values(tablesByEvent)[0][0].venue_id} />

                        {/* {
                            Object.entries(tablesByEvent).map(([eventName, items], index) => (
                                <div key={index} className='flex flex-col gap-4'>


                                    <div className="flex justify-between items-end">
                                        <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {Object.keys(items).length} items</span></h3>

                                        <p className='text-sm text-white/50'>
                                            PHP {calculateTableTotalAmountPerEvent(Object.values(items)).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>

                                    </div>


                                    {
                                        Object.values(items).map((item, index) => (
                                            <CartTableItem key={index} item={item} />
                                        ))
                                    }


                                </div>

                            ))
                        } */}
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

function CartTableItem({ eventId, venueId }: { eventId: number, venueId: number }) {

    const { removeTable, cart } = useCart()

    const [event, setEvent] = useState<Event | null>(null)

    const tables = cart.tables.map(table => table.venue_table_name_id);


    useEffect(() => {
        const fetchEvent = async () => {
            const res = await asyncFetch.get(`/admin/events/${eventId}/venues/${venueId}/tables`)

            if (!res.ok) return
            const data = await res.json()
            setEvent(data)
        }
        fetchEvent()
    }, [eventId, venueId])


    if (!event) return <></> // TODO: add loading state

    const venue = event.venues[0]
    const venueTableNames = venue.venue_table_names

    const filteredTableNames = venueTableNames.filter((tableName) => tables.includes(tableName.id))

    return (
        <>
            {
                filteredTableNames.map((tableName) => (
                    <TableCard key={tableName.id} event={event} venueTableName={tableName} showDetails/>
                ))
            }
        </>
    )
}