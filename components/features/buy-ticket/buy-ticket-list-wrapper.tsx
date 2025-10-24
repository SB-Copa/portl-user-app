'use client'

import { useDevice } from "@/hooks/use-device"
import { twMerge } from "tailwind-merge"

type BuyTicketListWrapperProps = {
    children?: React.ReactNode
    desktopClassName?: string
    mobileClassName?: string
}

export default function BuyTicketListWrapper({ children, desktopClassName, mobileClassName }: BuyTicketListWrapperProps) {
    const { isMobile } = useDevice()

    return (
        <div className={twMerge("grid grid-cols-3 gap-[3rem_0px]", isMobile ? mobileClassName : desktopClassName, isMobile && 'grid-cols-1')}>
            { children }
        </div>
    )
}