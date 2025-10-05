import { TabsTrigger } from '@/components/ui/tabs'
import React from 'react'


type StepTabsTriggerProps = {
    value: string
    children: React.ReactNode
}

export default function StepTabsTrigger({ value, children }: StepTabsTriggerProps) {
    return (
        <TabsTrigger value={value} className='text-white/30 border-0 border-b-[1.5px] border-b-white/30 rounded-none data-[state=active]:border-b-white data-[state=active]:bg-transparent data-[state=active]:text-white cursor-pointer'>
            {children}
        </TabsTrigger>
    )
}
