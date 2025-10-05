import { dummyEvents } from '@/dummy/events';
import { useParams } from 'next/navigation';
import React from 'react'

export default function StepOne() {
  const params = useParams();
  const slug = params?.slug;

  const event = dummyEvents.find((event) => event.id === Number(slug))

  return (
    <div className="flex flex-col">
      {
        event?.tickets?.map((ticket, index) => (
          <div key={index}>
            <h3>{ticket.title}</h3>
            <p>{ticket.description}</p>
            <p>{ticket.pricing.price} / {ticket.pricing.pax} pax</p>
          </div>
        ))
      }
    </div>
  )
}
