import React from 'react'
import CartForm from '@/components/cart/cart-form'

export default function Cart() {
    return (
        <div className="flex flex-col items-center w-full gap-10 py-4 min-h-screen">
            <CartForm />
        </div>
    )
}
