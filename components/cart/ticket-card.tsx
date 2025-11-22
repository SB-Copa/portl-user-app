'use client'

import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import { useDevice } from '@/hooks/use-device'

interface TicketCardProps {
    uniqueKey: string
    attendeeName: string
    eventName: string
    date: string
    venue: string
}

export default function TicketCard({
    uniqueKey,
    attendeeName,
    eventName,
    date,
    venue
}: TicketCardProps) {
    const { isMobile } = useDevice()

    return (
        <div className="flex flex-col w-full max-w-md mx-auto">
            <div className="rounded-xl flex flex-col gap-4 sm:gap-5 p-4 sm:p-5">
                <Image 
                    src={'/images/pd-logo-white.png'} 
                    alt='logo' 
                    width={100} 
                    height={100}
                    className="w-20 h-20 sm:w-[100px] sm:h-[100px]"
                />
                <div className="flex justify-center">
                    <QRCodeSVG
                        value={uniqueKey}
                        size={isMobile ? 200 : 280}
                        level="H"
                        fgColor="#000"
                        bgColor="#fff"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <h1 className="text-lg sm:text-xl font-semibold">{attendeeName}</h1>
                </div>
            </div>
            <div className="flex flex-col gap-4 sm:gap-5 border-t border-dashed p-4 sm:p-5">
                <h2 className="text-lg sm:text-xl font-semibold">{eventName}</h2>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-white/70">Date & Time</p>
                    <p className="text-sm sm:text-base">{date}</p>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="text-sm text-white/70">Venue</p>
                    <p className="text-sm sm:text-base">{venue}</p>
                </div>
            </div>
        </div>
    )
    return (
        <div className="w-full max-w-md mx-auto bg-black text-white overflow-hidden">
            {/* Top Section - Branding and QR Code */}
            <div className="p-6 pb-6">
                {/* Brand Name */}
                <div className="mb-6">
                    <div className="text-xl font-bold leading-tight tracking-tight">
                        <div className="flex items-center">
                            <span>P</span>
                            <span className="relative inline-flex items-center mx-0.5">
                                <span className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-white"></span>
                                <span className="px-[2px]">A</span>
                                <span className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-white"></span>
                            </span>
                            <span>RALLEL</span>
                        </div>
                        <div className="mt-0.5">DIMENSIONS</div>
                    </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center items-center bg-white p-6 rounded-lg">
                    <QRCodeSVG
                        value={uniqueKey}
                        size={280}
                        level="H"
                        includeMargin={true}
                        marginSize={2}
                        fgColor="#000000"
                        bgColor="#FFFFFF"
                    />
                </div>
            </div>

            {/* Middle Section - Attendee and Event Details */}
            <div className="px-6 pb-6 space-y-3">
                <h2 className="text-3xl font-bold leading-tight">{attendeeName}</h2>
                <p className="text-base font-normal">{eventName}</p>
                <p className="text-base font-normal">{date}</p>
                <p className="text-base font-normal">{venue}</p>
            </div>

            {/* Bottom Section - Perforated Line */}
            <div className="border-t-2 border-dashed border-white/50 px-6 py-6 flex justify-between items-start gap-8">
                <div className="flex-1 space-y-4">
                    <h3 className="text-2xl font-bold leading-tight">{eventName}</h3>
                    <div className="space-y-1">
                        <p className="text-sm font-normal">Date & Time</p>
                        <p className="text-base font-normal">{date}</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-normal">Venue</p>
                        <p className="text-base font-normal">{venue}</p>
                    </div>
                </div>
                <div className="text-right flex-shrink-0 space-y-2">
                    <div className="space-y-1">
                        <p className="text-sm font-normal">Ticket No.</p>
                        <p className="text-base font-mono font-normal">{uniqueKey}</p>
                    </div>
                    <div className="mt-6 text-xs font-bold leading-tight tracking-tight">
                        <div className="flex items-center justify-end">
                            <span>P</span>
                            <span className="relative inline-flex items-center mx-0.5">
                                <span className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-white"></span>
                                <span className="px-[2px]">A</span>
                                <span className="absolute right-0 top-0 bottom-0 w-[1.5px] bg-white"></span>
                            </span>
                            <span>RALLEL</span>
                        </div>
                        <div className="mt-0.5">DIMENSIONS</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

