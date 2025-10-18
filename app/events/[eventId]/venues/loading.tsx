import PageHeader from '@/components/layout/page-header'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function VenuesLoading() {
    return (
        <div className="flex flex-col items-center w-full gap-10 py-4">
            <PageHeader title={``} showBackButton />

            <div className="flex flex-col w-full gap-2">
                {
                    Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton key={index} className="w-full min-h-[300px] p-0 gap-0 overflow-clip border-2 border-[#2d2c2c]" />
                    ))
                }
            </div>
        </div>
    )
}