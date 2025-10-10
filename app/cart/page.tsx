import PageHeader from '@/components/layout/page-header'
import React from 'react'
import CartForm from '@/components/cart/cart-form'

export default function Cart() {
    return (
        <div className="flex flex-col items-center w-full gap-10 py-4 min-h-screen">
            <PageHeader title={'Cart'} showBackButton />

            <div className="flex flex-col w-full h-full flex-1 gap-3">
                <CartForm />
            </div>
        </div>
    )
}
