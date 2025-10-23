import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function TenantTopNavigation() {
    return (
        <div className="flex p-4 px-5 lg:px-32 border-b border-[#1e1e1e] bg-black/50 backdrop-blur-sm sticky top-0 h-20 items-center z-50">

            <Link href="/">
                <Image src="/images/pd-logo-white.png" priority fetchPriority='high' alt="logo" width={100} height={100} className="h-full w-fit self-start" />
            </Link>
            {/* <div className="flex items-center gap-3">
                <div className="size-10 rounded-2xl bg-white/10"></div>
                <h1>PARADIMES</h1>
            </div> */}
        </div>
    )
}
