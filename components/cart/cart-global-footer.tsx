'use client'

import useCart from '@/hooks/use-cart'
import { usePathname } from 'next/navigation'
import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function CartGlobalFooter() {
    const { cartItemsCount } = useCart()

    const pathname = usePathname()
    const isCartPage = pathname.split('/').includes('cart')

    if (cartItemsCount === 0 || isCartPage) return null

    return (
        <CartOverview>
            <CartOverviewActions>
                <Link href="/cart">
                    <Button variant="secondary">
                        View Cart
                    </Button>
                </Link>
            </CartOverviewActions>
        </CartOverview>
    )
}
