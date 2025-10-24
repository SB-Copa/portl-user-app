'use client'

import { usePathname, useRouter } from 'next/navigation'
import  { useEffect } from 'react'

export default function CartMainPage() {
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        router.push('/cart/confirmation')
    }, [pathname])

}
