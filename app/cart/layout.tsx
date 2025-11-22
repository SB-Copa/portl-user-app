'use client'

import DesktopCartSummary from '@/components/cart/desktop-cart-summary'
import MobileCart from '@/components/cart/mobile-cart'
import CartProgress from '@/components/cart/cart-progress'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { CartFormProvider } from '@/contexts/form-cart-context'
import useCart from '@/hooks/use-cart'
import { useDevice } from '@/hooks/use-device'
import { usePathname } from 'next/navigation'
import { ArrowRight, TicketX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CartLayout({ children }: { children: React.ReactNode }) {
    const { ticketsByEvent, tablesByEvent } = useCart()
    const { isMobile } = useDevice()
    const pathname = usePathname()

    // Don't show empty state on success page - allow it to render even with empty cart
    const isSuccessPage = pathname === '/cart/success'
    const isEmpty = Object.keys(ticketsByEvent).length === 0 && Object.keys(tablesByEvent).length === 0

    if (isEmpty && !isSuccessPage) {
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

    // Hide cart summary on success page - isSuccessPage is already declared above
    return (
        <div className="flex flex-col w-full gap-6 sm:gap-10 px-4 sm:px-5 lg:px-32 py-6 sm:py-10">
            <CartFormProvider>
                {!isSuccessPage && <CartProgress />}
                <div className={`flex w-full ${isSuccessPage ? 'flex-col' : 'flex-col lg:flex-row'} ${!isSuccessPage ? 'lg:gap-20' : ''} min-h-[calc(100lvh-23rem)]`}>

                    <div className="flex flex-col gap-6 sm:gap-10 flex-1 w-full">
                        {children}
                    </div>

                    {
                        !isSuccessPage && (
                            <>
                                {/* Desktop Cart Summary - hidden on mobile/tablet, shown on large screens */}
                                <div className="hidden lg:flex flex-col gap-10 flex-1 w-full lg:max-w-md">
                                    <DesktopCartSummary />
                                </div>

                                {/* Mobile Cart - shown on mobile/tablet, hidden on large screens */}
                                <div className="lg:hidden">
                                    <MobileCart />
                                </div>
                            </>
                        )
                    }

                </div>

            </CartFormProvider>
        </div>
    )
}
