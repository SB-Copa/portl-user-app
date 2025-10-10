'use client'

import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group'
import { Label } from '../ui/label'
import { useFormContext } from 'react-hook-form'

export default function UserDetails() {
    const { register } = useFormContext()
    return (

        <div className="flex flex-col">
            <div className="grid grid-cols-2 w-full gap-5">

                <InputGroup>
                    <InputGroupInput id="first-name" className='text-white ' {...register('firstName')} />
                    <InputGroupAddon align="block-start">
                        <Label htmlFor="first-name" className='text-xs'>
                            First Name
                        </Label>
                    </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                    <InputGroupInput id="last-name" className='text-white' {...register('lastName')} />
                    <InputGroupAddon align="block-start">
                        <Label htmlFor="last-name" className='text-xs'>
                            Last Name
                        </Label>
                    </InputGroupAddon>
                </InputGroup>

                <InputGroup>
                    <InputGroupInput id="email" className='text-white' {...register('email')} />
                    <InputGroupAddon align="block-start">
                        <Label htmlFor="email" className='text-xs'>
                            Email
                        </Label>
                    </InputGroupAddon>
                </InputGroup>


                <div className="flex flex-col relative">

                    <InputGroup>
                        <InputGroupInput
                            type='date'
                            id="birthdate"
                            className='text-white [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-100'
                            {...register('birthDate')}
                        />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="birthdate" className='text-xs'>
                                Birthdate
                            </Label>
                        </InputGroupAddon>
                    </InputGroup>

                    <p className='absolute top-[calc(100%+6px)] left-0 text-xs text-white/50'>Must be 18+ years old</p>

                </div>

            </div>


            
        </div>
    )
}
