import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export default function MainLoading() {
    return (
        <div className="flex flex-col items-center w-full gap-10 py-4">
            <div className="flex flex-col w-full gap-2">
                <h2 className='text-white text-lg font-bold'>Events for you</h2>
                <div className="flex gap-5 w-full max-w-full overflow-auto py-4 items-start">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className='p-0 gap-0 overflow-clip min-w-3/4 max-w-3/4 border-2 border-[#2d2c2c] rounded-lg'>
                            <div className='p-0'>
                                {/* Image skeleton */}
                                <Skeleton className='aspect-video w-full h-64' />

                                <div className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white p-4'>
                                    <div className="flex flex-col gap-5">
                                        {/* Title skeleton */}
                                        <div className="flex flex-col gap-2">
                                            <Skeleton className='h-6 w-3/4' />
                                        </div>

                                        {/* Date/time skeleton */}
                                        <div className="flex gap-2 text-sm">
                                            <Skeleton className='h-4 w-32' />
                                        </div>

                                        {/* Buttons skeleton */}
                                        <div className="flex gap-2 w-full">
                                            <Skeleton className='h-10 w-1/2' />
                                            <Skeleton className='h-10 w-1/2' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


