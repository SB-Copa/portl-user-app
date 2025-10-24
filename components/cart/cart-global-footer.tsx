'use client'

import useCart from '@/hooks/use-cart'
import { usePathname } from 'next/navigation'
import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import Link from 'next/link'
import { Button } from '../ui/button'
import { useDevice } from '@/hooks/use-device'

export default function CartGlobalFooter() {

    const { isMobile } = useDevice()
    const { totalItemCount } = useCart()

    const pathname = usePathname()
    const isCartPage = pathname.split('/').includes('cart')

    if (totalItemCount === 0 || isCartPage) return null

    if (!isMobile) return null

    return (
        <CartOverview>
            <CartOverviewActions>
                <Link href="/cart/confirmation">
                    <Button>
                        View Cart
                    </Button>
                </Link>
            </CartOverviewActions>
        </CartOverview>
    )
}
