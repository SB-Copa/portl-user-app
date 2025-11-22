'use client'

import { asyncFetch } from '@/lib/asyncFetch'
import { clearCartSessionStorage } from '@/lib/success-cleanup'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'

const POLL_INTERVAL = 3000
const MAX_POLL_ATTEMPTS = 60 // 3 minutes max (60 * 3000ms)

type TransactionStatus = 'pending' | 'success' | 'failed'

interface PaymentTransaction {
    status: {
        status: string
    }
}

export default function SilentPollCheckout({ external_id }: { external_id: string }) {
    const router = useRouter()
    const [status, setStatus] = useState<string>('Waiting for payment...')

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
                        setStatus('Transaction not found')
                        toast.error('Invalid transaction ID. Please try again.')
                        return false
                    }
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const { payment_transaction }: { payment_transaction: PaymentTransaction } =
                    await res.json()

                if (!payment_transaction) {
                    setStatus('Transaction not found')
                    toast.error('Transaction not found. Please try again.')
                    return false
                }

                return true
            } catch (error) {
                console.error('Validation error:', error)
                setStatus('Error validating transaction')
                toast.error('Failed to validate transaction. Please try again.')
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
                        setStatus('Transaction not found')
                        toast.error('Transaction not found. Please try again.')
                        router.push('/cart/confirmation')
                        return
                    }
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const { payment_transaction }: { payment_transaction: PaymentTransaction } =
                    await res.json()

                const transactionStatus = payment_transaction.status.status.toLowerCase() as TransactionStatus

                // Handle different statuses
                switch (transactionStatus) {
                    case 'pending':
                        pollAttempts++
                        setStatus(`Checking payment status... (${pollAttempts}/${MAX_POLL_ATTEMPTS})`)

                        if (pollAttempts >= MAX_POLL_ATTEMPTS) {
                            setStatus('Transaction timeout')
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
                        setStatus('Payment successful!')
                        // Clear sessionStorage and redirect with external_id in URL
                        clearCartSessionStorage()
                        toast.success('Payment successful!')
                        router.push(`/cart/success?external_id=${external_id}`)
                        break

                    case 'failed':
                        setStatus('Payment failed')
                        toast.error('Payment failed. Please try again.')
                        router.push('/cart/confirmation')
                        break

                    default:
                        setStatus('Unknown transaction status')
                        toast.error('Unknown transaction status')
                }
            } catch (error) {
                if (isCancelled) return

                console.error('Polling error:', error)
                setStatus('Error checking payment status')
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
    }, [external_id, router])

    return (
        <div className="text-center">
            <p className="text-xs text-muted-foreground">{status}</p>
        </div>
    )
}

