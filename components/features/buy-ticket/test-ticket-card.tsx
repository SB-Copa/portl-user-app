'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import useCart from "@/hooks/use-cart"
import { Event } from "@/schema/event-schema"
import { EventTicket } from "@/schema/ticket-schema"
import { ArrowDownNarrowWideIcon, CornerRightDown, Minus, Plus, Ticket, TicketIcon } from "lucide-react"

type TestTicketCardProps = {
    ticket: EventTicket
    event: Event
}

export default function TestTicketCard({ ticket, event }: TestTicketCardProps) {

    const { getTicketCartItem, addTicket, decreaseTicketQuantity, updateTicketQuantity } = useCart()

    const handleAddTicket = () => {
        const currentQuantity = cartTicket?.quantity || 0
        if (currentQuantity < ticket.available_tickets) {
            addTicket({
                event_ticket_type_id: ticket.id,
                event_id: ticket.event_id,
                quantity: 1,
                price: ticket.price,
                event_name: event.name,
                name: ticket.name,
                max_capacity: 1,
            })
        }
    }

    const handleChangeTicketQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const quantity = Number(e.target.value)

        if (quantity > ticket.available_tickets) return

        if (quantity < 1) {
            updateTicketQuantity(ticket.id, 0)
            return
        }

        updateTicketQuantity(ticket.id, quantity)
    }


    const cartTicket = getTicketCartItem(ticket.id)
    const ticketQuantity = cartTicket?.quantity || 0

    return (
        <div className="flex flex-col w-full border-l border-white/20 p-6  gap-10 hover:bg-white/5">

            <div className="flex flex-col gap-2">

                <div className="flex gap-2 items-center">
                    <TicketIcon />
                    <h2 className='text-3xl font-medium'>{ticket.name}</h2>
                </div>
                <p className="mb-5 text-white/70">{ticket.description}</p>
                <p><span className='font-bold'>PHP</span> {Number(ticket.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
            </div>



            <div className="flex flex-col gap-3 mt-auto">
                <div className="flex gap-3 items-center">
                    <Button variant='ghost' className="size-10" size={'icon'} onClick={() => decreaseTicketQuantity(ticket.id)}>
                        <Minus className="size-4" />
                    </Button>
                    <Input className="w-14 text-center" value={ticketQuantity} onChange={handleChangeTicketQuantity} />
                    <Button variant='ghost' className="size-10" size={'icon'} onClick={handleAddTicket}>
                        <Plus className="size-4" />
                    </Button>
                </div>
            </div>
        </div>
    )

}