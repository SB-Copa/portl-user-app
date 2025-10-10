import PageHeader from '@/components/layout/page-header'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { dummyEvents } from '@/dummy/events'
import { CreditCard, Grid2X2Check, SquarePlus, Ticket, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import BuyTicketForm from '@/components/features/event/buy-ticket/buy-ticket-form'
import StepTabsTrigger from '@/components/cart/step-tabs-trigger'
import { asyncFetch } from '@/lib/asyncFetch'
import { EventTicketType, stepOneSchema } from '@/schema/ticket-schema'
import { useFormContext } from 'react-hook-form'
import z from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Event } from '@/schema/event-schema'
import useCart from '@/hooks/use-cart'
import TicketCard from '@/components/features/event/buy-ticket/ticket-card'

type BuyTicketsProps = {
    params: {
        slug: string
    }
}

export default async function BuyTickets({ params }: BuyTicketsProps) {

    const { slug } = await params

    const resEvent = await asyncFetch.get(`/admin/events/${slug}/tickets`)
    const event = await resEvent.json() as Event
    const tickets = event.event_ticket_types

    // const event = dummyEvents.find((event) => event.id === Number(slug))
    // if (!event) return notFound()


    return (
        <div className="flex flex-col items-center w-full gap-10 py-4 min-h-screen">
            <PageHeader title={event.name} showBackButton />

            <div className="flex flex-col w-full h-full flex-1 gap-3">
                {
                    tickets?.map((ticket: EventTicketType) => (
                        <TicketCard key={ticket.id} ticket={ticket} eventName={event.name} />
                    ))
                }
                {/* <BuyTicketForm /> */}
            </div>
        </div>
    )
}



