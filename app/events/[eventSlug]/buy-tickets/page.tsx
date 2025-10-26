import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { PageHeader, PageHeaderBackButton, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from '@/components/layout/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import { twMerge } from 'tailwind-merge'
import { Suspense } from 'react'
import TicketsList from '@/components/features/buy-ticket/tickets-list'
import TablesList from '@/components/features/buy-ticket/tables-list'

type BuyTicketsProps = {
    params: {
        eventSlug: string
    },
    searchParams: {
        tab: 'tickets' | 'tables'
    }
}

export default async function BuyTickets({ params, searchParams }: BuyTicketsProps) {


    return (
        <div className="flex flex-col items-center w-full gap-10 py-10 min-h-screen px-5 lg:px-32">

            <PageHeader>
                <PageHeaderContent >
                    <Suspense fallback={<PageHeaderContentDetailsSkeleton />}>
                        <PageHeaderContentDetails params={params} />
                    </Suspense>
                </PageHeaderContent>
            </PageHeader>


            <div className="flex flex-col w-full h-full flex-1 gap-3">

                <Suspense fallback={<BuyTicketsTabsSkeleton />}>
                    <BuyTicketsTabs params={params} searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    )
}

const PageHeaderContentDetails = async ({ params }: Pick<BuyTicketsProps, 'params'>) => {
    const { eventSlug } = await params
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paradimes/events/${eventSlug}`, {
        credentials: 'include',
    })
    const event = await res.json()

    return (
        <>
            <PageHeaderBackButton href={`/events/${eventSlug}`} > Back to Event Details </PageHeaderBackButton>
            <PageHeaderTitle> Buy Tickets for {event.name} </PageHeaderTitle>
            <PageHeaderDescription> {event.description} </PageHeaderDescription>
        </>
    )
}

const BuyTicketsTabs = async ({ params, searchParams }: BuyTicketsProps) => {
    const { eventSlug } = await params
    const { tab } = await searchParams

    return (
        <Tabs defaultValue={tab || 'tickets'} className="flex-1 flex flex-col gap-10">
            <TabsList className='flex w-full lg:w-fit bg-transparent gap-0 rounded-none p-0'>
                <TabsTrigger value="tickets" asChild>
                    <Button variant={'outline'} asChild>
                        <Link href={`/events/${eventSlug}/buy-tickets?tab=tickets`}>Tickets</Link>
                    </Button>
                </TabsTrigger>
                <TabsTrigger value="tables" asChild>
                    <Button variant={'outline'} asChild>

                        <Link href={`/events/${eventSlug}/buy-tickets?tab=tables`}>Tables</Link>
                    </Button>
                </TabsTrigger>
            </TabsList>

            <TabsContent value="tickets">
                <Suspense fallback={<TicketListSkeleton />}>
                    <TicketsList eventSlug={eventSlug} />
                </Suspense>
            </TabsContent>
            <TabsContent value="tables">
                <Suspense fallback={<TicketListSkeleton className='grid-cols-2' />}>
                    <TablesList eventSlug={eventSlug} />
                </Suspense>
            </TabsContent>

        </Tabs>
    )
}

const BuyTicketsTabsSkeleton = () => {
    return (
        <Tabs className="flex-1 flex flex-col gap-10">
            <TabsList className='flex w-full lg:w-fit bg-transparent gap-0 rounded-none p-0'>
                <Skeleton className="w-20 h-10" />
                <Skeleton className="w-20 h-10" />
            </TabsList>
        </Tabs>
    )
}

const PageHeaderContentDetailsSkeleton = () => {
    return (
        <>
            <Skeleton className="w-3/4 h-10" />
            <Skeleton className="w-full h-4" />
        </>
    )
}

const TicketListSkeleton = ({ className }: { className?: string }) => {
    return (
        <div className={twMerge("grid grid-cols-3 w-full h-full gap-3", className)}>
            <Skeleton className="w-full h-[280px]" />
            <Skeleton className="w-full h-[280px]" />
            <Skeleton className="w-full h-[280px]" />
        </div>
    )
}
