import EventCard from '@/components/features/event/event-card'

import { Event } from '@/schema/event-schema'
import { PageHeader, PageHeaderBackButton, PageHeaderContent, PageHeaderTitle } from '@/components/layout/page-header'

export default async function Events() {
  return (
    <div className="flex flex-col w-full gap-10 px-5 lg:px-32 py-10">

      <PageHeader>
        <PageHeaderContent>
          <PageHeaderBackButton href='/' > Back to Homepage </PageHeaderBackButton>
          <PageHeaderTitle> All Events</PageHeaderTitle>
        </PageHeaderContent>
      </PageHeader>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-5">
        {
          <EventsList />
        }
      </div>
    </div>
  )
}


const EventsList = async () => {
  "use cache"
  
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/paradimes/events`, {
    credentials: 'include',
  })

  const { data: events } = await res.json()

  console.log(events)

  return (
    <>
      {events?.map((event: Event, index: number) => (
        <EventCard key={index} event={event} />
      ))}
    </>
  )
}