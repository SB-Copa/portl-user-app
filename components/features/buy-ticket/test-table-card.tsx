'use client'

import { Toggle } from '@/components/ui/toggle'
import useCart from '@/hooks/use-cart'
import { useDevice } from '@/hooks/use-device'
import { EventSingleVenue } from '@/schema/event-schema'
import { VenueTable, VenueTableName, VenueTableRequirement } from '@/schema/venue-schema'
import { Martini } from 'lucide-react'
import React from 'react'
import { twMerge } from 'tailwind-merge'

type TestTableCardProps = {
    event: EventSingleVenue
    venueTableName: VenueTableName
}

export default function TestTableCard({ event, venueTableName }: TestTableCardProps) {
    const { isMobile } = useDevice()
    return (
        <div className={twMerge("flex flex-col w-full border-l border-white/20 p-6  gap-10 hover:bg-white/5", isMobile && 'border')}>

            <div className="flex flex-col gap-2">

                <div className="flex gap-2 items-center">
                    <Martini />
                    <h2 className='text-2xl lg:text-3xl font-medium'>{venueTableName.name}</h2>
                </div>

                {
                    venueTableName.venue_table_requirements.map((requirement) => (

                        <div key={requirement.id} className="flex flex-col">
                            <p className="mb-5 text-white/70">{requirement.name}</p>
                            <p><span className='font-bold'>PHP</span> {Number(requirement.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                        </div>
                    ))
                }
            </div>

            <div className="flex flex-col gap-2">
                <p>Select tables</p>
                <div className="grid grid-cols-5 gap-2">
                    {
                        venueTableName.venue_tables.map((table) => (
                            <TableCardToggle key={table.id} event={event} venueTable={table} venueTableName={venueTableName} tableRequirements={venueTableName.venue_table_requirements[0]} />
                        ))
                    }
                </div>
            </div>


            {/* <div className="flex flex-col gap-3 mt-auto">
                <div className="flex gap-3 items-center">
                    <Button variant='ghost' className="size-10" size={'icon'} onClick={() => decreaseTicketQuantity(ticket.id)}>
                        <Minus className="size-4" />
                    </Button>
                    <Input className="w-14 text-center" value={ticketQuantity} onChange={handleChangeTicketQuantity} />
                    <Button variant='ghost' className="size-10" size={'icon'} onClick={handleAddTicket}>
                        <Plus className="size-4" />
                    </Button>
                </div>
            </div> */}
        </div>
    )
}


type TableCardToggleProps = {
    event: EventSingleVenue
    venueTable: VenueTable
    venueTableName: VenueTableName
    tableRequirements: VenueTableRequirement
}

const TableCardToggle = ({ event, venueTable, venueTableName, tableRequirements }: TableCardToggleProps) => {

    const { addTable, removeTable, isTableInCart } = useCart()

    const handleOnPressChange = (state: boolean) => {

        if (state) {
            addTable({
                venue_id: venueTableName.venue_id,
                venue_table_id: venueTable.id,
                venue_table_name_id: venueTableName.id,
                venue_table_holder_type_id: 1,
                price: tableRequirements.price,
                event_name: event.name,
                event_id: event.id,
                table_name: venueTableName.name,
                legend: venueTable.legend,
                max_capacity: venueTable.capacity,
            })

            return
        }

        removeTable(venueTable.id)

    }

    const inCart = isTableInCart(venueTable.id)


    return (
        <Toggle pressed={inCart} onPressedChange={handleOnPressChange} key={venueTable.id} className='border border-white rounded p-2 px-4 data-[state=on]:bg-white/30 data-[state=on]:text-white cursor-pointer hover:bg-white/30 hover:text-white'>
            <p className='text-sm'>{venueTable.legend}</p>
        </Toggle>
    )
}
