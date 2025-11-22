'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import PollCheckout from '../checkout/poll-checkout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Copy } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import SilentPollCheckout from './silent-poll-checkout'

interface QRCodeData {
    image_url: string
    amount: number
    label: string
    id: string
}

export default function QRCodeDisplay({ external_id }: { external_id: string }) {
    const router = useRouter()
    const [qrData, setQrData] = useState<QRCodeData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Get QR code data from sessionStorage
        const storedQrData = sessionStorage.getItem('qr_code_data')
        if (storedQrData) {
            try {
                const parsed = JSON.parse(storedQrData)
                setQrData(parsed)
                setLoading(false)
            } catch (error) {
                console.error('Error parsing QR data:', error)
                setLoading(false)
            }
        } else {
            // If not in sessionStorage, redirect back
            router.push('/cart/confirmation')
        }
    }, [router])

    const handleDownloadQR = () => {
        if (!qrData?.image_url) return

        try {
            const link = document.createElement('a')
            link.href = qrData.image_url
            link.download = `qr-code-${qrData.id}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            toast.success('QR code downloaded')
        } catch (error) {
            console.error('Error downloading QR:', error)
            toast.error('Failed to download QR code')
        }
    }

    const handleCopyImage = async () => {
        if (!qrData?.image_url) return

        try {
            const response = await fetch(qrData.image_url)
            const blob = await response.blob()
            await navigator.clipboard.write([
                new ClipboardItem({
                    [blob.type]: blob
                })
            ])
            toast.success('QR code copied to clipboard')
        } catch (error) {
            console.error('Error copying QR:', error)
            toast.error('Failed to copy QR code')
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-8">
                <p className="text-sm text-muted-foreground">Loading QR code...</p>
            </div>
        )
    }

    if (!qrData) {
        return null
    }

    const amount = qrData.amount ? (qrData.amount / 100).toFixed(2) : '0.00'

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-8 min-h-[calc(100lvh-20rem)]">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Scan QR Code to Pay</CardTitle>
                    <CardDescription>
                        Scan this QR code with your QRPH app to complete payment
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    {/* QR Code Display */}
                    <div className="relative bg-white p-4 rounded-lg">
                        <img
                            src={qrData.image_url}
                            alt="QR Code"
                            className="w-64 h-64 object-contain"
                        />
                    </div>

                    {/* Payment Details */}
                    <div className="flex flex-col items-center gap-2 w-full">
                        <div className="flex justify-between w-full">
                            <span className="text-sm text-muted-foreground">Amount:</span>
                            <span className="text-lg font-semibold">PHP {parseFloat(amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                        {qrData.label && (
                            <div className="flex justify-between w-full">
                                <span className="text-sm text-muted-foreground">Merchant:</span>
                                <span className="text-sm">{qrData.label}</span>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 w-full">
                        <Button
                            variant="outline"
                            onClick={handleDownloadQR}
                            className="flex-1"
                        >
                            <Download size={16} />
                            Download
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleCopyImage}
                            className="flex-1"
                        >
                            <Copy size={16} />
                            Copy
                        </Button>
                    </div>

                    {/* Back Button */}
                    <Link href="/cart/details" className="w-full">
                        <Button variant="ghost" className="w-full">
                            <ArrowLeft size={16} />
                            Back to Details
                        </Button>
                    </Link>

                    {/* Polling Status - runs in background silently */}
                    <div className="w-full pt-4 border-t">
                        <SilentPollCheckout external_id={external_id} />
                    </div>
                </CardContent>
            </Card>

            <div className="text-center max-w-md">
                <p className="text-sm text-muted-foreground">
                    Please scan the QR code with your QRPH app to complete the payment.
                    We will automatically process your order once payment is confirmed.
                </p>
            </div>
        </div>
    )
}

