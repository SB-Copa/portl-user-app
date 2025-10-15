'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Toggle } from '@/components/ui/toggle'
import useCart from '@/hooks/use-cart'
import { Event } from '@/schema/event-schema'
import { VenueTable, VenueTableName, VenueTableRequirement } from '@/schema/venue-schema'
import React from 'react'

type TableCardProps = {
    event: Event
    venueTableName: VenueTableName
}

export default function TableCard({ event, venueTableName }: TableCardProps) {

    const tableRequirements = venueTableName.venue_table_requirements[0]

    return (
        <Card className='p-0 gap-0 overflow-clip border-none outline-2 outline-[#2d2c2c]'>
            <CardContent className='flex flex-col gap-10 bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>

                <div className="flex flex-col">
                    <h2 className='text-xl font-bold'>{venueTableName.name}</h2>
                    <p><span className='font-bold'>PHP {parseFloat(tableRequirements.price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> / {tableRequirements.capacity} pax</p>
                    <p className='italic text-sm'>{tableRequirements.description}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <h3 className='text-white/50 text-sm'>Choose Table</h3>

                    <div className="flex flex-wrap gap-2">
                        {
                            venueTableName.venue_tables.map((venueTable, index) => (
                                <TableCardToggle key={index} event={event} venueTable={venueTable} venueTableName={venueTableName} tableRequirements={tableRequirements} />
                            ))
                        }
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

type TableCardToggleProps = {
    event: Event
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
