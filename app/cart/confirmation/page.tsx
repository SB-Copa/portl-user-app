'use client'

import CartTableItem from '@/components/cart/cart-table-item'
import CartTicketItem from '@/components/cart/cart-ticket-item'
import useCart from '@/hooks/use-cart'
import { Martini, Ticket } from 'lucide-react'
import React from 'react'
import { useDevice } from '@/hooks/use-device'


export default function ConfirmationPage() {
    const { ticketsByEvent, tablesByEvent } = useCart()
    const { isMobile } = useDevice()

    return (
        <>
            {
                Object.keys(ticketsByEvent).length > 0 && (
                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-2 items-center">
                            <Ticket />
                            <h2>Tickets</h2>
                        </div>
                        {
                            Object.entries(ticketsByEvent).map(([eventName, items]) => (
                                <div key={eventName} className='flex flex-col gap-4'>
                                    <div className="flex gap-3 items-center">
                                        <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-xl'}`}>{eventName}</h3>
                                        <p className='text-sm text-white/50 font-normal'>|</p>
                                        <span className='text-sm text-white/50 font-normal'> {items.length} item/s</span>
                                    </div>
                                    {
                                        items.map((item) => (
                                            <CartTicketItem key={item.event_ticket_type_id} item={item} />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                Object.keys(tablesByEvent).length > 0 && (
                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-2 items-center">
                            <Martini />
                            <h2>Tables</h2>
                        </div>

                        {
                            Object.entries(tablesByEvent).map(([eventName, items]) => (
                                <div key={eventName} className='flex flex-col gap-4'>
                                    <div className="flex gap-3 items-center">
                                        <h3 className={`font-bold ${isMobile ? 'text-base' : 'text-xl'}`}>{eventName}</h3>
                                        <p className='text-sm text-white/50 font-normal'>|</p>
                                        <span className='text-sm text-white/50 font-normal'> {items.length} item/s</span>
                                    </div>

                                    {
                                        items.map((item) => (
                                            <CartTableItem key={item.venue_table_id} item={item} />
                                        ))
                                    }
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}
