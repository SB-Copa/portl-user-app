'use client'

import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { toast } from 'sonner'
import useCart from './use-cart'
import { calculateAge } from '@/lib/utils'
import { fullFormSchema } from '@/schema/cart-schema'
import { z } from 'zod'

type FormValues = z.infer<typeof fullFormSchema>

export function useCheckout() {
    const router = useRouter()
    const { getValues, trigger } = useFormContext<FormValues>()
    const { allTicketsPerEvent } = useCart()

    const handleCheckout = async () => {
        // Validate form before checkout
        const isValid = await trigger()
        if (!isValid) {
            toast.error('Please fill in all required fields correctly')
            return
        }

        const values = getValues()
        const { tickets, tables, ...formValues } = values

        const modifiedAllTicketsPerEvent = allTicketsPerEvent.map(event => {
            return {
                event_id: event.event_id,
                event_tickets: event.event_tickets.map(ticket => ({
                    event_ticket_type_id: ticket.event_ticket_type_id,
                    quantity: ticket.quantity,
                })),
                // venue_table_reservations: event.venue_table_reservations.map(table => ({
                //     venue_id: table.venue_id,
                //     venue_table_id: table.venue_table_id,
                //     venue_table_name_id: table.venue_table_name_id,
                //     venue_table_holder_type_id: table.venue_table_holder_type_id,
                //     description: '',
                //     is_primary: table.is_primary ?? false,
                //     guests: table.guests ?? []
                // }))
            }
        })

        const paymentMethod = formValues.payment?.method ?? 'qrph'
        const qrphDetails = formValues.payment?.qrph ?? { name: '', email: '', phone: '' }

        const payload = {
            events: modifiedAllTicketsPerEvent,
            first_name: formValues.first_name,
            last_name: formValues.last_name,
            middle_name: (formValues as any).middle_name || 'middle name',
            email: formValues.email,
            suffix_id: 1, //get data from server
            sex_id: 1, //get data from server
            age: calculateAge(formValues.birthdate), //remove
            birthdate: formValues.birthdate,
            host_ref_code: null,
            payment: {
                method: paymentMethod,
                billing: {
                    name: qrphDetails.name || `${formValues.first_name} ${formValues.last_name}`,
                    email: qrphDetails.email ?? formValues.email,
                    phone: qrphDetails.phone || '',
                }
            },
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/purchase-ticket`, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            })

            if (!res.ok) {
                toast.error('Failed to checkout')
                return
            }

            const response = await res.json()
            const { message, payment_url, external_id, response: paymentResponse } = response

            // Store external_id in sessionStorage for later use
            if (external_id) {
                sessionStorage.setItem('external_id', external_id)
            }

            // Handle different payment methods based on next_action
            // Check if response has next_action (for QRPH payments)
            if (paymentResponse?.data?.attributes?.next_action) {
                const nextAction = paymentResponse.data.attributes.next_action
                
                // Handle QRPH QR code payments
                if (nextAction.code && (nextAction.code.type === 'consume_qr' || nextAction.type === 'consume_qr')) {
                    // QRPH payment - show QR code
                    const codeData = nextAction.code || nextAction
                    const qrData = {
                        image_url: codeData.image_url,
                        amount: codeData.amount,
                        label: codeData.label,
                        id: codeData.id,
                    }
                    sessionStorage.setItem('qr_code_data', JSON.stringify(qrData))
                    router.push(`/cart/qr?external_id=${external_id}`)
                    return
                }
            }
            
            // Also check if payment_url is a base64 data URL (for backward compatibility)
            if (payment_url && payment_url.startsWith('data:image')) {
                const qrData = {
                    image_url: payment_url,
                    amount: 0,
                    label: 'QRPH Payment',
                    id: external_id,
                }
                sessionStorage.setItem('qr_code_data', JSON.stringify(qrData))
                router.push(`/cart/qr?external_id=${external_id}`)
                return
            }

            // Fallback: if payment_url exists (for other payment methods like GCash)
            if (payment_url) {
                window.open(payment_url, '_blank')
            }

            router.push(`/cart/checkout?external_id=${external_id}`)
        } catch (error) {
            console.error('Checkout error:', error)
            toast.error('An error occurred during checkout')
        }
    }

    return { handleCheckout }
}

