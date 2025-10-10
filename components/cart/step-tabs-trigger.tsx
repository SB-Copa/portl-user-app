import { TabsTrigger } from '@/components/ui/tabs'
import React from 'react'
import { twMerge } from 'tailwind-merge'


type StepTabsTriggerProps = {
    value: string
    children?: React.ReactNode
    className?: string
}

export default function StepTabsTrigger({ value, className, children }: StepTabsTriggerProps) {
    return (
        <TabsTrigger value={value} className={twMerge('text-white/30 border-0 border-b-[1.5px] border-b-white/30 rounded-none data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:text-white cursor-pointer w-full', className)}>
            {children}
        </TabsTrigger>
    )
}
