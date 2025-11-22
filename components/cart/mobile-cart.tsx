'use client'

import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import { Button } from '../ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useCheckout } from '@/hooks/use-checkout'


export default function MobileCart() {

    const pathname = usePathname()

    return (
        <CartOverview>
            <CartOverviewActions>

                {pathname === '/cart/confirmation' && <ConfirmationButtons />}
                {pathname === '/cart/details' && <UserDetailsButtons />}
                {pathname === '/cart/payment' && <PaymentButtons />}


            </CartOverviewActions>
        </CartOverview>
    )
}

const ConfirmationButtons = () => {
    return (
        <div className="flex">
            <Button variant="default" size="sm" asChild>
                <Link href="/cart/details" className="flex items-center gap-1.5">
                    <span>Next</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </Button>
        </div>
    )
}

const UserDetailsButtons = () => {
    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/cart/confirmation" className="flex items-center gap-1.5">
                    <ArrowLeft className="size-3.5" />
                    <span>Back</span>
                </Link>
            </Button>

            <Button variant="default" size="sm" asChild>
                <Link href="/cart/payment" className="flex items-center gap-1.5">
                    <span>Next</span>
                    <ArrowRight className="size-3.5" />
                </Link>
            </Button>
        </div>
    )
}

const PaymentButtons = () => {
    const { handleCheckout } = useCheckout()

    return (
        <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
                <Link href="/cart/details" className="flex items-center gap-1.5">
                    <ArrowLeft className="size-3.5" />
                    <span>Back</span>
                </Link>
            </Button>

            <Button variant="default" size="sm" onClick={handleCheckout} className="flex items-center gap-1.5">
                <span>Checkout</span>
                <ArrowRight className="size-3.5" />
            </Button>
        </div>
    )
}
