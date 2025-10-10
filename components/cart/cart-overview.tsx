'use client'

import React from 'react'
import useCart from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

type CartOverviewProps = {
    children?: React.ReactNode
}

const CartOverview = ({ children }: CartOverviewProps) => {

    const { cartItemsCount, cartTotal } = useCart()

    return (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[520px] p-4 rounded-t-xl bg-black/60 backdrop-blur-3xl outline outline-white/20">
            <div className="flex items-center justify-between ">
                <div className="flex items-center gap-4">
                    <div className="size-10 aspect-square bg-gradient-to-br font-bold text-base flex items-center justify-center rounded-full">
                        {cartItemsCount}
                    </div>

                    <div className="flex flex-col">
                        <p className='font-bold text-sm'>PHP {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className='text-sm text-white/80'>Total</p>
                    </div>
                </div>

                {children}
            </div>
        </div>
    )
}

CartOverview.displayName = "CartOverview"


const CartOverviewActions = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn("flex items-center gap-2", className)}
        {...props}
    />
))
CartOverviewActions.displayName = "CartOverviewActions"


export {
    CartOverview,
    CartOverviewActions
}

