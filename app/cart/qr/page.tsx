import QRCodeDisplay from './qr-code-display'
import { redirect } from 'next/navigation'

type QRPageProps = {
    searchParams: Promise<{
        external_id: string
    }>
}

export default async function QRPage({ searchParams }: QRPageProps) {
    const { external_id } = await searchParams

    if (!external_id) redirect('/cart/confirmation')

    return <QRCodeDisplay external_id={external_id} />
}

