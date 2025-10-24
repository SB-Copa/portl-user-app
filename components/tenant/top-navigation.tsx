'use client'

import { useDevice } from '@/hooks/use-device'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DesktopCart from '../cart/desktop-cart'

export default function TenantTopNavigation() {
    const { isMobile } = useDevice()

    return (
        <div className="flex p-4 px-5 lg:px-32 border-b border-[#1e1e1e] bg-black/80 backdrop-blur-sm sticky top-0 h-20 items-center z-50 justify-between">

            <Link href="/">
                <Image src="/images/pd-logo-white.png" priority fetchPriority='high' alt="logo" width={100} height={100} className="h-full w-fit self-start" />
            </Link>

            

            {
                !isMobile && <DesktopCart />
            }
        </div>
    )
}
