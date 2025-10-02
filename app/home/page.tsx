import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material'
import React from 'react'

const events = [
    {
        name: "Sunset Social",
        price: 350,
        dateTime: "2024-07-12T18:00:00",
        location: "Funroof, Poblacion",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Tropical Beats",
        price: 500,
        dateTime: "2024-07-19T20:00:00",
        location: "Salty Coconut, Poblacion",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Rooftop Vibes",
        price: 600,
        dateTime: "2024-07-26T19:30:00",
        location: "Atmosfera, Poblacion",
        image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=200&fit=crop&crop=center"
    },
    {
        name: "Chill & Grill",
        price: 400,
        dateTime: "2024-08-02T17:00:00",
        location: "Funroof, Poblacion",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=400&h=200&fit=crop&crop=center"
    }
]

export default function Homepage() {
    return (
        <div className="flex flex-col items-center w-full gap-10 py-4">
            <div className="flex justify-between items-center w-full">
                <h1 className='text-lg font-bold'>Welcome, User</h1>

                <div className="flex">
                    <Button variant="contained" color="primary" className='bg-white text-black'>
                        Login
                    </Button>
                </div>
            </div>


            <div className="flex flex-col w-full gap-2">
                <h2 className='text-white text-lg font-bold'>Events for you</h2>
                <div className="flex gap-5 w-full max-w-full overflow-auto py-4 items-start">
                    {events.map((event) => (
                        <Card key={event.name} className='min-w-3/4 max-w-3/4 w-3/4 rounded-xl border border-gray-800 relative'>
                            <CardMedia className='aspect-video' component="img" height="400px" image={event.image} alt={event.name} />
                            <CardContent className='bg-gradient-to-br from-[#3a363b] via-[#0e0a0e] to-[#0e0a0e] text-white'>

                                <div className="flex flex-col gap-5">
                                    <div className="flex flex-col">
                                        <h3 className='text-lg font-bold'>{event.name}</h3>
                                        <p className='text-sm'>{event.price}</p>
                                    </div>

                                    <div className="flex gap-2 text-sm">

                                        <p>
                                            {new Date(event.dateTime).toLocaleString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                hour: "numeric",
                                                minute: "2-digit",
                                                hour12: true
                                            }).replace(",", "")}
                                        </p>

                                        <p>|</p>

                                        <p>{event.location}</p>

                                    </div>

                                    <div className="flex gap-2 w-full">
                                        <Button variant='outlined' className='outline-white border-white text-white w-full '>Save</Button>
                                        <Button variant='contained' className='bg-white text-black w-full '>Buy Ticket</Button>
                                    </div>
                                </div>
                            </CardContent>

                            <div className="flex absolute top-4 left-4 bg-red-600/30 text-white rounded-full py-1 px-3 text-xs backdrop-blur-md border border-white z-50">Only few tickets left</div>

                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
