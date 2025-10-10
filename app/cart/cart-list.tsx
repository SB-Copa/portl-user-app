'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import useCart from '@/hooks/use-cart'
import { CartItem as CartItemType } from '@/schema/ticket-schema'
import { Trash } from 'lucide-react'
import React from 'react'

export default function CartList() {
    const { cartItemsPerEvent } = useCart()

    const calculateTotalAmountPerEvent = (items: CartItemType[]) => {
        return items.reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
    }

    return (
        <div className='flex flex-col gap-10'>

            {
                Object.entries(cartItemsPerEvent).map(([eventName, items]) => (
                    <div key={eventName} className='flex flex-col gap-4'>


                        <div className="flex justify-between items-end">
                            <h3 className='text-xl font-bold'>{eventName} <span className='text-sm text-white/50 font-normal'>| {items.length} items</span></h3>

                            <p className='text-sm text-white/50'>
                                PHP {calculateTotalAmountPerEvent(items).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>

                        </div>


                        <div className="flex flex-col gap-2">
                            {
                                items.map((item) => (
                                    <CartItem key={item.id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
}


function CartItem({ item }: { item: CartItemType }) {

    const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart()
    return (
        <Card className='p-0 gap-0 overflow-clip border-none outline-2 outline-[#2d2c2c]'>
            <CardContent className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>
                <div className="flex w-full justify-between gap-10 items-center">
                    <div className="flex flex-col gap-1">
                        <h4>{item.name}</h4>
                        <p className='font-bold'>
                            PHP {Number(item.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>

                    </div>

                    <div className="flex gap-2">
                        <div className="flex items-center gap-2">
                            <Button variant='ghost' onClick={() => decreaseQuantity(item.id)}>-</Button>

                            <p className='text-sm'>{item.quantity}</p>

                            <Button variant='ghost' onClick={() => increaseQuantity(item.id)}>+</Button>
                        </div>

                        <Button variant='default' onClick={() => removeFromCart(item.id)}><Trash /></Button>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}