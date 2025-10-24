'use client'

import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'


export default function MobileCart() {

    const pathname = usePathname()

    return (
        <CartOverview>
            <CartOverviewActions>

                {pathname === '/cart/confirmation' && <ConfirmationButtons />}
                {pathname === '/cart/details' && <UserDetailsButtons />}
                {/* { pathname === '/cart/confirmation' && <ConfirmationButtons /> } */}


            </CartOverviewActions>
        </CartOverview>
    )
}

const ConfirmationButtons = () => {
    return (
        <div className="flex">
            <Button variant="default" asChild>
                <Link href="/cart/details">
                    <span>Next</span>
                    <ArrowRight />
                </Link>
            </Button>
        </div>
    )
}

const UserDetailsButtons = () => {

    return (
        <div className="flex gap-2">
            <Button variant="outline" asChild>
                <Link href="/cart/confirmation">
                    <span>Back</span>
                </Link>
            </Button>

            <Button variant="default" asChild>
                <Link href="/cart/details">
                    <span>Next</span>
                    <ArrowRight />
                </Link>
            </Button>
        </div>
    )
}
