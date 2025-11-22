import PollCheckout from './poll-checkout'
import { redirect } from 'next/navigation'

type CheckoutPageProps = {
    searchParams: Promise<{
        external_id: string
    }>
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {

    const { external_id } = await searchParams;

    if (!external_id) redirect('/cart/confirmation')

    return <PollCheckout external_id={external_id} />
}
