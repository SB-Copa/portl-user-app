'use client'

import useCart from "@/hooks/use-cart"
import { ArrowLeft, ArrowRight, Martini, Ticket } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import Link from "next/link"

export default function DesktopCartSummary() {
    const pathname = usePathname()
    const { cart } = useCart()
    const [isConfirmed, setIsConfirmed] = useState(false)

    const ticketTotal = cart.tickets.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    const tableTotal = cart.tables.reduce((total, item) => total + parseFloat(item.price), 0)
    const cartTotal = ticketTotal + tableTotal

    const tickets = cart.tickets
    const tables = cart.tables


    return (
        <div className="flex flex-col border border-[#2c2d2c] rounded p-10 gap-5 sticky top-28  self-start w-full">
            <h2 className='text-xl font-medium'>Cart Summary</h2>

            <hr />

            {
                tickets?.length > 0 && (
                    <div className="flex w-full justify-between">

                        <div className="flex gap-5 items-center">
                            <Ticket size={18} />
                            <p>Ticket Total</p>
                        </div>
                        <p>PHP {ticketTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                )
            }

            {
                tables?.length > 0 && (
                    <div className="flex w-full justify-between">
                        <div className="flex gap-5 items-center">
                            <Martini size={18} />
                            <p>Table Total</p>
                        </div>
                        <p>PHP {tableTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    </div>
                )
            }

            {
                (tickets?.length > 0 || tables?.length > 0) && <hr className='border-[#2c2d2c]' />
            }



            <div className="flex w-full justify-between">

                <div className="flex gap-5 items-center">
                    <ShoppingCart size={18} />
                    <p>Cart Total</p>
                </div>
            <p className='text-2xl font-medium'>PHP {cartTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>

            {
                (pathname === '/cart/confirmation' && (tickets?.length > 0 || tables?.length > 0)) && (
                    <div className="flex flex-col gap-4 mt-20">
                        <div className="flex gap-4 items-start">
                            <Checkbox checked={isConfirmed} onCheckedChange={() => setIsConfirmed(!isConfirmed)} />
                            <p className='text-sm leading-none'>I confirm that I have checked and verified my table and ticket selections.</p>
                        </div>

                        {
                            !isConfirmed ? (
                                <Button disabled={!isConfirmed} className="flex-1">
                                    <span>Fill User Details</span>
                                    <ArrowRight />
                                </Button>
                            ) :
                                <Button disabled={!isConfirmed} asChild className="flex-1">
                                    <Link href="/cart/details" className="flex-1">
                                        <span>Fill User Details</span>
                                        <ArrowRight />
                                    </Link>
                                </Button>
                        }
                    </div>
                )
            }

            {
                pathname === '/cart/details' && (
                    <div className="flex gap-4 mt-20 w-full">
                        <Button variant="outline" className='flex-1' asChild>
                            <Link href="/cart/confirmation" className="flex-1">
                                <ArrowLeft />
                                Back
                            </Link>
                        </Button>

                        <Button className='flex-1'>
                            Proceed to Checkout
                            <ArrowRight />
                        </Button>
                    </div>
                )
            }
        </div>
    )
}