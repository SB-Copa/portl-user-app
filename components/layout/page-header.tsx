'use client'

import React from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

type PageHeaderProps = {
    title: string
    description?: string
    showBackButton?: boolean
    backButtonLink?: string
    backButtonOnClick?: () => void
}
export default function PageHeader({ title, description, showBackButton = false, backButtonLink, backButtonOnClick }: PageHeaderProps) {
    const router = useRouter()
    return (
        <div className='flex flex-col w-full'>


            <div className="flex gap-10">
                {showBackButton && (
                    <Button variant="ghost" size="icon" onClick={() => backButtonOnClick ? backButtonOnClick() : backButtonLink ? router.push(backButtonLink) : router.back()}>
                        <ArrowLeftIcon className="w-4 h-4" />
                    </Button>
                )}

                <div className="flex flex-col">
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    {
                        description && (
                            <p className='text-sm text-gray-500'>{description}</p>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
