import Image from 'next/image'
import React from 'react'

export default function Footer() {
    return (
        <div className="flex flex-col items-center justify-center w-full gap-10 px-5 lg:px-32 py-10 border-t border-white/20 pb-32 lg:pb-10">
            <div className="flex flex-col w-fit gap-10">
                <Image src="/images/portl-logo-white.svg" alt="logo" width={100} height={100} className="h-10 w-fit self-start" />
            </div>
        </div>
    )
}
