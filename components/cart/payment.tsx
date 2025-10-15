import React from 'react'
import PageHeader from '../layout/page-header'
import { Button } from '../ui/button'
import useCart from '@/hooks/use-cart'
import { useFormContext } from 'react-hook-form'
import { asyncFetch } from '@/lib/asyncFetch'

export default function Payment() {

    const { cart, allTicketsPerEvent } = useCart()
    const { getValues } = useFormContext()

    const handleCheckout = async () => {
        const values = getValues()
        const { tickets, tables, ...formValues } = values;

        console.log(allTicketsPerEvent)

        const modifiedAllTicketsPerEvent = allTicketsPerEvent.map(event => {
            return {
                event_id: event.event_id,
                event_tickets: event.event_tickets.map(ticket => ({
                    event_ticket_type_id: ticket.event_ticket_type_id,
                    venue_id: ticket.venue_id,
                    quantity: ticket.quantity,
                    is_primary: ticket.is_primary ?? false,
                    guests: ticket.guests ?? []
                })),
                venue_table_reservations: event.venue_table_reservations.map(table => ({
                    venue_id: table.venue_id,
                    venue_table_id: table.venue_table_id,
                    venue_table_name_id: table.venue_table_name_id,
                    venue_table_holder_type_id: table.venue_table_holder_type_id,
                    description: '',
                    is_primary: table.is_primary ?? false,
                    guests: table.guests ?? []
                }))
            }
        })

        const res = await asyncFetch.post('/guest/purchase-ticket', {
            body: JSON.stringify({
                ...formValues,
                events: modifiedAllTicketsPerEvent,
                suffix_id: 1,
                sex_id: 1,
                age: 20, //TODO: remove on backend update
                middle_name: 'test'
            })
        })


        console.log(cart, values)
    }


    return (
        <div className="flex flex-col gap-10">
            <PageHeader title={'Payment'} showBackButton />

            <div className="flex flex-col gap-4">

                <Button type='button' onClick={handleCheckout}>
                    Click to Pay
                </Button>
            </div>

        </div>
    )
}
