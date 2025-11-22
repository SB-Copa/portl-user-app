'use client'

import { Spinner } from '@/components/ui/spinner'
import { asyncFetch } from '@/lib/asyncFetch'
import { clearCartSessionStorage } from '@/lib/success-cleanup'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback, useTransition } from 'react'
import { toast } from 'sonner'

const POLL_INTERVAL = 3000
const MAX_POLL_ATTEMPTS = 60 // 3 minutes max (60 * 3000ms)

type TransactionStatus = 'pending' | 'success' | 'failed'

interface PaymentTransaction {
    status: {
        status: string
    }
}

export default function PollCheckout({ external_id }: { external_id: string }) {
    const [isPurchaseProcessing, setIsPurchaseProcessing] = useState(true)
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    const handleNavigation = useCallback(() => {
        startTransition(() => {
            router.push('/cart/confirmation')
        })
    }, [router])

    useEffect(() => {
        let timeoutId: NodeJS.Timeout | null = null
        let pollAttempts = 0
        let isCancelled = false

        const validateExternalId = async (): Promise<boolean> => {
            try {
                const res = await asyncFetch.get(
                    `/payment/transaction?external_id=${external_id}`
                )

                if (!res.ok) {
                    if (res.status === 404) {
                        toast.error('Invalid transaction ID. Please try again.')
                        setIsPurchaseProcessing(false)
                        router.push('/cart/confirmation')
                        return false
                    }
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const { payment_transaction }: { payment_transaction: PaymentTransaction } =
                    await res.json()

                if (!payment_transaction) {
                    toast.error('Transaction not found. Please try again.')
                    setIsPurchaseProcessing(false)
                    router.push('/cart/confirmation')
                    return false
                }

                return true
            } catch (error) {
                console.error('Validation error:', error)
                toast.error('Failed to validate transaction. Please try again.')
                setIsPurchaseProcessing(false)
                router.push('/cart/confirmation')
                return false
            }
        }

        const pollPurchaseStatus = async () => {
            if (isCancelled) return

            try {
                const res = await asyncFetch.get(
                    `/payment/transaction?external_id=${external_id}`
                )

                if (!res.ok) {
                    if (res.status === 404) {
                        setIsPurchaseProcessing(false)
                        toast.error('Transaction not found. Please try again.')
                        router.push('/cart')
                        return
                    }
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const { payment_transaction }: { payment_transaction: PaymentTransaction } =
                    await res.json()

                const status = payment_transaction.status.status.toLowerCase() as TransactionStatus


                // Handle different statuses
                switch (status) {
                    case 'pending':
                        pollAttempts++

                        if (pollAttempts >= MAX_POLL_ATTEMPTS) {
                            setIsPurchaseProcessing(false)
                            toast.error('Transaction timeout. Please check your order status.')
                            return
                        }

                        timeoutId = setTimeout(() => {
                            if (!isCancelled) {
                                pollPurchaseStatus()
                            }
                        }, POLL_INTERVAL)
                        break

                    case 'success':
                        setIsPurchaseProcessing(false)
                        // Clear sessionStorage and redirect with external_id in URL
                        clearCartSessionStorage()
                        toast.success('Payment successful!')
                        router.push(`/cart/success?external_id=${external_id}`)
                        break

                    case 'failed':
                        setIsPurchaseProcessing(false)
                        router.push('/cart/confirmation')
                        toast.error('Payment failed. Please try again.')
                        break

                    default:
                        setIsPurchaseProcessing(false)
                        toast.error('Unknown transaction status')
                }
            } catch (error) {
                if (isCancelled) return

                console.error('Polling error:', error)
                setIsPurchaseProcessing(false)
                toast.error('Error checking transaction status. Please refresh the page.')
            }
        }

        // Validate external_id first, then start polling
        const initializePolling = async () => {
            const isValid = await validateExternalId()
            if (isValid && !isCancelled) {
                // Start polling after validation
                pollPurchaseStatus()
            }
        }

        initializePolling()

        // Cleanup function
        return () => {
            isCancelled = true
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
        }
    }, [external_id, handleNavigation, router])

    if (isPurchaseProcessing || isPending) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
                <Spinner />
                <p className="text-sm text-muted-foreground">
                    Processing your payment...
                </p>
            </div>
        )
    }

    return null
}