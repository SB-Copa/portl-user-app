'use client'

import DesktopCartSummary from '@/components/cart/desktop-cart-summary'
import MobileCart from '@/components/cart/mobile-cart'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { CartFormProvider } from '@/contexts/form-cart-context'
import useCart from '@/hooks/use-cart'
import { useDevice } from '@/hooks/use-device'
import { ArrowRight, TicketX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CartLayout({ children }: { children: React.ReactNode }) {
    const { ticketsByEvent, tablesByEvent } = useCart()
    const { isMobile } = useDevice()


    if (Object.keys(ticketsByEvent).length === 0 && Object.keys(tablesByEvent).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100lvh-20rem)]">
                <Empty  >
                    <EmptyHeader>
                        <EmptyMedia variant="icon">
                            <TicketX />
                        </EmptyMedia>
                        <EmptyTitle>No Tickets or Tables in Cart</EmptyTitle>
                        <EmptyDescription>
                            You haven&apos;t added any tickets or tables to your cart yet. Add some to continue.
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <div className="flex gap-2">
                            <Button asChild>
                                <Link href="/events">
                                    <span>Browse Events</span>
                                    <ArrowRight />
                                </Link>
                            </Button>
                        </div>
                    </EmptyContent>
                </Empty>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full gap-10 px-5 lg:px-32 py-10">
            <CartFormProvider>
                <div className="flex w-full gap-20 min-h-[calc(100lvh-23rem)]">

                    <div className="flex flex-col gap-10 flex-1">
                        {children}
                    </div>

                    {
                        !isMobile && (
                            <div className="flex flex-col gap-10 flex-1">
                                <DesktopCartSummary />
                            </div>
                        )
                    }

                </div>

                {
                    isMobile && (
                        <MobileCart />
                    )
                }

            </CartFormProvider>
        </div>
    )
}
