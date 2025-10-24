'use client'

import CartTableItem from '@/components/cart/cart-table-item'
import CartTicketItem from '@/components/cart/cart-ticket-item'
import useCart from '@/hooks/use-cart'
import { Martini, Ticket } from 'lucide-react'

export default function CartList() {
    const { ticketsByEvent, tablesByEvent } = useCart()
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
                                <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {items.length} item/s</span></h3>

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
                                <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {items.length} item/s</span></h3>

                                {
                                    items.map((item) => (
                                        <CartTableItem key={item.venue_table_id} item={item} />
                                    ))
                                }
                            </div>
                        ))
                    }

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
                </div>
            )
        }
    </>
    )
}




