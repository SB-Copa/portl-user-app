'use client'

import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import useCart from '@/hooks/use-cart'
import { MiniCartTicketItem } from './cart-ticket-item'
import { MiniCartTableItem } from './cart-table-item'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRightIcon, ShoppingCart, Trash2 } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog'
import { toast } from 'sonner'
import { Badge } from '../ui/badge'
import { useDevice } from '@/hooks/use-device'

export default function DesktopCart() {
  const { cart, clearCart, totalItemCount } = useCart()
  const { isMobile } = useDevice()

  const tickets = cart.tickets
  const tables = cart.tables

  const ticketTotal = cart.tickets.reduce((total, ticket) => total + parseFloat(ticket.price) * ticket.quantity, 0)
  const tableTotal = cart.tables.reduce((total, table) => total + parseFloat(table.price), 0)

  const handleClearCart = () => {
    clearCart()
    toast.success('Cart cleared successfully')
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='relative'>
          <ShoppingCart className={isMobile ? 'size-4' : ''} />
          {!isMobile && <span>Cart</span>}
          {totalItemCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {totalItemCount > 99 ? '99+' : totalItemCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent 
        align={isMobile ? 'center' : 'end'} 
        className={`bg-black/80 backdrop-blur-sm border-[#2c2d2c] text-white ${isMobile ? 'w-[calc(100vw-2rem)] max-w-md' : 'w-fit'} mt-10`}
      >
        <div className={`flex flex-col gap-5 ${isMobile ? 'w-full' : 'w-fit'}`}>
          <div className="flex gap-2 items-center">
            <ShoppingCart size={19} />
            <h3 className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>Your Cart</h3>
          </div>

          <hr />

          {
            (tickets?.length <= 0 && tables?.length <= 0) ? (
              <div className="flex flex-col gap-2">
                <h4 className='text-sm font-medium text-white/50'>No items in cart</h4>
              </div>
            ) : (
              <>

                {
                  tickets.length > 0 && (
                    <>
                      <div className="flex flex-col gap-2">
                        <h4 className='text-sm font-medium text-white/50'>Tickets</h4>
                        {
                          tickets.map((ticket) => (
                            <MiniCartTicketItem key={ticket.event_ticket_type_id} item={ticket} />
                          ))
                        }
                      </div>

                      <hr className='border-[#2c2d2c]' />
                    </>
                  )
                }

                {
                  tables.length > 0 && (
                    <>
                      <div className="flex flex-col gap-2">
                        <h4 className='text-sm font-medium text-white/50'>Tables</h4>
                        {
                          tables.map((table) => (
                            <MiniCartTableItem key={table.venue_table_id} item={table} />
                          ))
                        }
                      </div>

                      <hr className='border-[#2c2d2c]' />
                    </>
                  )
                }


                <div className="flex flex-col gap-5">

                  <div className="flex flex-col gap-1 text-end items-end">
                    <p className='text-sm font-medium text-white/50'>Total</p>
                    <p className={`${isMobile ? 'text-base' : 'text-lg'} font-medium`}>PHP {Number(ticketTotal + tableTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <PopoverClose asChild>
                      <Button asChild className={isMobile ? 'w-full' : ''}>
                        <Link href="/cart/confirmation" className="flex items-center justify-center gap-2">
                          <span>Confirm and Checkout</span>
                          <ArrowRightIcon className='size-4' />
                        </Link>
                      </Button>
                    </PopoverClose>

                    {totalItemCount > 0 && (
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className={`text-red-500 hover:text-red-600 hover:bg-red-500/10 border-red-500/20 ${isMobile ? 'w-full' : ''}`}
                          >
                            <Trash2 size={14} />
                            <span>Clear Cart</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-black/80 backdrop-blur-sm border-[#2c2d2c] text-white">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to clear all items from your cart? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="mt-10">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                              <Button variant='destructive' onClick={handleClearCart}>
                                <Trash2 size={16} />
                                <span>Clear Cart</span>
                              </Button>
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    )}
                  </div>
                </div>

              </>
            )
          }

        </div>
      </PopoverContent>
    </Popover>
  )
}
