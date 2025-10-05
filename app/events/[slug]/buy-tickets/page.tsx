import PageHeader from '@/components/layout/PageHeader'
import { Tabs, TabsList } from '@/components/ui/tabs'
import { dummyEvents } from '@/dummy/events'
import { CreditCard, Grid2X2Check, SquarePlus, Ticket, User } from 'lucide-react'
import { notFound } from 'next/navigation'
import React from 'react'
import BuyTicketForm from '@/components/features/event/buy-ticket/BuyTicketForm'
import StepTabsTrigger from '@/components/features/event/buy-ticket/StepTabsTrigger'

type BuyTicketsProps = {
    params: {
        slug: string
    }
}

export default async function BuyTickets({ params }: BuyTicketsProps) {

    const { slug } = await params

    const event = dummyEvents.find((event) => event.id === Number(slug))
    if (!event) return notFound()

    return (
        <div className="flex flex-col items-center w-full gap-10 py-4">
            <PageHeader title={event?.name || ''} showBackButton />

            <div className="flex flex-col w-full">
                <Tabs defaultValue="step1" className="w-full">
                    <TabsList className='w-full bg-transparent gap-0 rounded-none p-0'>
                        <StepTabsTrigger value="step1"><Ticket /></StepTabsTrigger>
                        <StepTabsTrigger value="step2"><User /></StepTabsTrigger>
                        <StepTabsTrigger value="step3"><CreditCard /></StepTabsTrigger>
                        <StepTabsTrigger value="step4"><Grid2X2Check /></StepTabsTrigger>
                        <StepTabsTrigger value="step5"><SquarePlus /></StepTabsTrigger>
                    </TabsList>

                    <BuyTicketForm />
                </Tabs>
            </div>
        </div>
    )
}


