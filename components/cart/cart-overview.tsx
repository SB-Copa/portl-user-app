'use client'

import React from 'react'
import useCart from '@/hooks/use-cart'
import { cn } from '@/lib/utils'

type CartOverviewProps = {
    children?: React.ReactNode
}

const CartOverview = ({ children }: CartOverviewProps) => {

    const { totalItemCount, cartTotal } = useCart()

    return (
        <div className="fixed bottom-0 left-0 right-0 mx-auto max-w-[520px] p-3 sm:p-4 rounded-t-xl bg-black/60 backdrop-blur-3xl outline outline-white/20 z-50">
            <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
                    <div className="size-8 sm:size-10 aspect-square bg-gradient-to-br from-gray-900 ring ring-white/20 font-bold text-sm sm:text-base flex items-center justify-center rounded-full flex-shrink-0">
                        {totalItemCount}
                    </div>

                    <div className="flex flex-col min-w-0">
                        <p className='font-bold text-xs sm:text-sm truncate'>PHP {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        <p className='text-xs sm:text-sm text-white/80'>Total</p>
                    </div>
                </div>

                <div className="flex-shrink-0">
                    {children}
                </div>
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

