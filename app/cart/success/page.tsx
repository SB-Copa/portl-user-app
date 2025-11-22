'use client'

import React, { useEffect, useState } from 'react'
import { asyncFetch } from '@/lib/asyncFetch'
import { useRouter, useSearchParams } from 'next/navigation'
import { clearCartSessionStorage } from '@/lib/success-cleanup'
import { CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import TicketCard from '@/components/cart/ticket-card'

interface EventReservationTicket {
    id: number
    event_reservation_id: number
    event_ticket_type_id: number
    event_reservation_ticket_guest_id: number | null
    event_reservation_ticket_unique_key: string
    entered_datetime: string | null
    entered_count: number | null
    created_at: string
    updated_at: string
    event_reservation_ticket_guests: unknown | null
}

interface User {
    id: number
    first_name: string
    middle_name: string | null
    last_name: string
    email: string
}

interface EventReservation {
    id: number
    event_reservation_unique_id: string
    event_id: number
    user_type: string
    user_id: number
    event_reservation_tickets: EventReservationTicket[]
    user: User
}

interface Venue {
    id: number
    name: string
    address: string
}

interface EventDetails {
    id: number
    name: string
    date: string
    time: string
    venues: Venue
}

interface TransactionResponse {
    payment_transaction: {
        id: number
        external_id: string
        status: {
            id: number
            status: string
        }
        user: User
    }
    event_reservations: EventReservation[]
    venue_table_reservations: unknown[]
}

export default function SuccessCheckout() {
    const [transaction, setTransaction] = useState<TransactionResponse | null>(null)
    const [eventDetails, setEventDetails] = useState<Record<number, EventDetails>>({})
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams()

    useEffect(() => {
        const handleSuccess = async () => {
            try {
                const external_id = searchParams.get('external_id')

                if (!external_id) {
                    router.push('/cart/confirmation')
                    return
                }

                // Fetch transaction data
                const res = await asyncFetch.get(
                    `/payment/transaction?external_id=${external_id}`
                )

                if (!res.ok) {
                    if (res.status === 404) {
                        router.push('/cart/confirmation')
                        return
                    }
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const transactionData = await res.json()


                if (!transactionData) {
                    router.push('/cart/confirmation')
                    return
                }

                setTransaction(transactionData)

                // Fetch event details for each unique event_id
                if (transactionData?.event_reservations) {
                    const uniqueEventIds = Array.from(
                        new Set(transactionData.event_reservations.map((r: EventReservation) => r.event_id))
                    )

                    const eventDetailsPromises = uniqueEventIds.map(async (eventId) => {
                        try {
                            const eventRes = await asyncFetch.get(
                                `/marketing/paradimes/events/${eventId}/published`
                            )
                            if (eventRes.ok) {
                                const eventData = await eventRes.json()
                                return { eventId, eventData }
                            }
                        } catch (error) {
                            console.error(`Error fetching event ${eventId}:`, error)
                        }
                        return null
                    })

                    const eventDetailsResults = await Promise.all(eventDetailsPromises)
                    const detailsMap: Record<number, EventDetails> = {}
                    
                    eventDetailsResults.forEach((result) => {
                        if (result?.eventData && typeof result.eventId === 'number') {
                            detailsMap[result.eventId] = result.eventData as EventDetails
                        }
                    })

                    setEventDetails(detailsMap)
                }

                clearCartSessionStorage()
            } catch (error) {
                console.error('Error fetching transaction:', error)
                router.push('/cart/confirmation')
            } finally {
                setLoading(false)
            }
        }

        handleSuccess()
    }, [router, searchParams])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-8 min-h-[calc(100lvh-20rem)]">
                <p className="text-sm text-muted-foreground">Loading your tickets...</p>
            </div>
        )
    }

    // Extract all tickets from all event reservations
    const allTickets: Array<{ ticket: EventReservationTicket; reservation: EventReservation }> = []
    if (transaction?.event_reservations) {
        transaction.event_reservations.forEach((reservation) => {
            reservation.event_reservation_tickets.forEach((ticket) => {
                allTickets.push({ ticket, reservation })
            })
        })
    }


    const primaryUser = transaction?.payment_transaction?.user

    // Format date and time
    const formatDateTime = (date?: string, time?: string) => {
        if (!date) return 'Date & Time TBA'
        
        try {
            const dateTimeString = time ? `${date}T${time}` : date
            const dateTime = new Date(dateTimeString)
            
            return dateTime.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            })
        } catch {
            return time ? `${date} ${time}` : date
        }
    }

    // Format venue
    const formatVenue = (venue?: Venue) => {
        if (!venue) return 'Venue TBA'
        return venue.address ? `${venue.name}, ${venue.address}` : venue.name
    }


    return (
        <div className="flex flex-col gap-6 sm:gap-8 py-6 sm:py-8 min-h-[calc(100lvh-20rem)]">
            <div className="flex flex-col items-center gap-3 sm:gap-4 text-center px-4">
                <CheckCircle className="w-12 h-12 sm:w-16 sm:h-16 text-green-500" />
                <h1 className="text-2xl sm:text-3xl font-bold">Payment Successful!</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                    Your payment has been confirmed. Your tickets are ready!
                </p>
            </div>

            {allTickets.length > 0 ? (
                <div className="flex flex-col gap-6 sm:gap-8 items-center w-full">
                    {allTickets.map(({ ticket, reservation }) => {
                        const eventDetail = eventDetails[reservation.event_id]
                        const eventName = eventDetail?.name || 'Event'
                        const dateTime = formatDateTime(eventDetail?.date, eventDetail?.time)
                        const venue = formatVenue(eventDetail?.venues)

                        return (
                            <TicketCard
                                key={ticket.id}
                                uniqueKey={ticket.event_reservation_ticket_unique_key}
                                attendeeName={`${primaryUser?.first_name} ${primaryUser?.last_name}`}
                                eventName={eventName}
                                date={dateTime}
                                venue={venue}
                            />
                        )
                    })}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-muted-foreground">No tickets found for this transaction.</p>
                </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
                <Button asChild variant="outline" className="w-full sm:w-auto">
                    <a href="/cart/confirmation?from_success=true">
                        Start New Purchase
                    </a>
                </Button>
                <Button asChild className="w-full sm:w-auto">
                    <a href="/events">
                        Browse More Events
                    </a>
                </Button>
            </div>
        </div>
    )
}
