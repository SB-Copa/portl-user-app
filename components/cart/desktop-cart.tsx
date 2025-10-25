import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import useCart from '@/hooks/use-cart'
import { MiniCartTicketItem } from './cart-ticket-item'
import { MiniCartTableItem } from './cart-table-item'
import { Button } from '../ui/button'
import Link from 'next/link'
import { ArrowRightIcon, ShoppingCart } from 'lucide-react'
import { PopoverClose } from '@radix-ui/react-popover'

export default function DesktopCart() {
  const { cart } = useCart()

  const tickets = cart.tickets
  const tables = cart.tables

  const ticketTotal = cart.tickets.reduce((total, ticket) => total + parseFloat(ticket.price) * ticket.quantity, 0)
  const tableTotal = cart.tables.reduce((total, table) => total + parseFloat(table.price), 0)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='ghost'>
          <ShoppingCart />
          <span>Cart</span>
        </Button>
      </PopoverTrigger>

      <PopoverContent align='end' className='bg-black/80 backdrop-blur-sm border-[#2c2d2c] text-white w-fit mt-10'>
        <div className="flex flex-col gap-5 w-fit">
          <div className="flex gap-2 items-center">
            <ShoppingCart size={19} />
            <h3 className='text-lg font-medium'>Your Cart</h3>
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
                    <p className='text-lg font-medium'>PHP {Number(ticketTotal + tableTotal).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  </div>

                  <PopoverClose asChild>
                    <Button asChild>
                      <Link href="/cart/confirmation">
                        <span>Confirm and Checkout</span>
                        <ArrowRightIcon className='size-4' />
                      </Link>
                    </Button>
                  </PopoverClose>
                </div>

              </>
            )
          }

        </div>
      </PopoverContent>
    </Popover>
  )
}
