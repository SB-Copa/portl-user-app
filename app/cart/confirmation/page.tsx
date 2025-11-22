'use client'

import CartTableItem from '@/components/cart/cart-table-item'
import CartTicketItem from '@/components/cart/cart-ticket-item'
import useCart from '@/hooks/use-cart'
import { Martini, Ticket } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDevice } from '@/hooks/use-device'
import { useCartFormContext } from '@/contexts/form-cart-context'
import { usePathname, useSearchParams } from 'next/navigation'

export default function ConfirmationPage() {
    const { ticketsByEvent, tablesByEvent, clearCart } = useCart()
    const { isMobile } = useDevice()
    const form = useCartFormContext()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Reset cart and form only if coming from success page (starting a new purchase)
    useEffect(() => {
        const fromSuccess = searchParams.get('from_success') === 'true'
        
        if (fromSuccess) {
            // User is starting a new purchase after completing one
            // Clear cart and form to start fresh
            clearCart()
            form.reset({
                tickets: [],
                tables: [],
                payment: {
                    method: 'qrph',
                    qrph: {
                        name: '',
                        email: '',
                        phone: '',
                    }
                }
            })
            
            // Clean up the URL parameter
            const url = new URL(window.location.href)
            url.searchParams.delete('from_success')
            window.history.replaceState({}, '', url.pathname + url.search)
        }
    }, [searchParams, clearCart, form])

    return (
        <>
            {
                Object.keys(ticketsByEvent).length > 0 && (
                    <div className='flex flex-col gap-5'>
                        <div className="flex gap-2 items-center">
                            <Ticket className="size-4 sm:size-5" />
                            <h2 className="text-lg sm:text-xl font-semibold">Tickets</h2>
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
                            <Martini className="size-4 sm:size-5" />
                            <h2 className="text-lg sm:text-xl font-semibold">Tables</h2>
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
