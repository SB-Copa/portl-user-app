'use client'

import React from 'react'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { CircleQuestionMark, Plus, Trash, User, Users } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import useCart from '@/hooks/use-cart'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { CartTicket, CartVenueTable } from '@/schema/cart-schema'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type CartItem =
    | (CartTicket & {
        type: 'ticket'
    })
    | (CartVenueTable & {
        type: 'table'
    })

export default function UserDetails() {
    const router = useRouter()
    const { register, setValue, getValues, watch, formState: { errors } } = useFormContext()
    const { ticketsByEvent, tablesByEvent } = useCart()
    const watchedTickets = watch('tickets')
    const watchedTables = watch('tables')

    const tables: CartVenueTable[] = watchedTables || []
    const tickets: CartTicket[] = watchedTickets || []

    const isAtFullCapacity = (item: CartTicket | CartVenueTable, type: 'ticket' | 'table') => {
        const cartItem = type === 'ticket'
            ? watchedTickets?.find((ticket: CartTicket) =>
                'event_ticket_type_id' in item && ticket.event_ticket_type_id === item.event_ticket_type_id)
            : watchedTables?.find((table: CartVenueTable) =>
                'venue_table_id' in item && table.venue_table_id === item.venue_table_id)

        if (!cartItem) return false

        const currentGuestCount = cartItem.guests?.length || 0
        const maxCapacity = cartItem.max_capacity

        if (cartItem.is_primary) {
            return currentGuestCount >= maxCapacity - 1
        }

        return currentGuestCount >= maxCapacity
    }

    const isCurrentlyPrimary = (item: CartTicket | CartVenueTable, type: 'ticket' | 'table') => {
        const cartItem = type === 'ticket'
            ? watchedTickets?.find((ticket: CartTicket) =>
                'event_ticket_type_id' in item && ticket.event_ticket_type_id === item.event_ticket_type_id)
            : watchedTables?.find((table: CartVenueTable) =>
                'venue_table_id' in item && table.venue_table_id === item.venue_table_id)

        return cartItem?.is_primary || false
    }

    const handleSelectPrimaryTicket = (value: string) => {
        const [type, id] = value.split('-')
        const itemId = parseInt(id)

        const currentValues = getValues()

        currentValues.tickets?.forEach((_: CartTicket, index: number) => {
            setValue(`tickets.${index}.is_primary`, false, { shouldDirty: false })
        })

        currentValues.tables?.forEach((_: CartVenueTable, index: number) => {
            setValue(`tables.${index}.is_primary`, false, { shouldDirty: false })
        })

        if (type === 'ticket') {
            const ticketIndex = currentValues.tickets?.findIndex(
                (ticket: CartTicket) => ticket.event_ticket_type_id === itemId
            )
            if (ticketIndex !== undefined && ticketIndex >= 0) {
                setValue(`tickets.${ticketIndex}.is_primary`, true, { shouldDirty: false })
            }
        } else if (type === 'table') {
            const tableIndex = currentValues.tables?.findIndex(
                (table: CartVenueTable) => table.venue_table_id === itemId
            )
            if (tableIndex !== undefined && tableIndex >= 0) {
                setValue(`tables.${tableIndex}.is_primary`, true, { shouldDirty: false })
            }
        }
    }

    if (tickets?.length <= 0 && tables?.length <= 0) {
        toast.warning('You must have at least one ticket or table in your cart')
        router.push('/cart/confirmation?error=no_items')
    }

    return (

        <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">

                    <div className="flex gap-2 items-center">
                        <User className="size-4 sm:size-5" />
                        <h2 className="text-lg sm:text-xl font-semibold">Primary guest</h2>
                    </div>
                    <p className='text-xs sm:text-sm text-white/80'>All tickets will be automatically filled with the primary guest's details. Please make sure the information you provide in the form is correct.</p>
                </div>

                {/* //! DEPRECATED  */}
                {/* <InputGroup>
                    <Select onValueChange={handleSelectPrimaryTicket}>
                        <SelectTrigger className='w-full border-none cursor-pointer'>
                            <SelectValue placeholder="Choose" />
                        </SelectTrigger>
                        <SelectContent className=' text-secondary-foreground border-none bg-[#2f2f2e]'>

                            <SelectGroup >
                                <SelectLabel className='font-bold text-sm'>Tables</SelectLabel>
                                {
                                    Object.entries(tablesByEvent).map(([eventName, items], index: number) => (

                                        <SelectGroup key={index}>
                                            <SelectLabel>{eventName}</SelectLabel>
                                            {
                                                items.map((item, index: number) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={`table-${item.venue_table_id.toString()}`}
                                                        disabled={isAtFullCapacity(item, 'table') && !isCurrentlyPrimary(item, 'table')}
                                                    >
                                                        <div className="flex flex-col gap-1 items-start text-start">
                                                            <span>
                                                                {item.table_name} - {item.legend}
                                                            </span>

                                                            {
                                                                isAtFullCapacity(item, 'table') && !isCurrentlyPrimary(item, 'table') && (
                                                                    <span className='text-xs text-white/50 italic'>
                                                                        This table is at full capacity, remove at least 1 guest to select this table.
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>

                                    ))
                                }
                            </SelectGroup>

                            <SelectGroup className='mt-5'>
                                <SelectLabel className='font-bold text-sm'>Tickets</SelectLabel>
                                {
                                    Object.entries(ticketsByEvent).map(([eventName, items], index: number) => (

                                        <SelectGroup key={index}>
                                            <SelectLabel>{eventName}</SelectLabel>
                                            {
                                                items.map((item, index: number) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={`ticket-${item.event_ticket_type_id.toString()}`}
                                                        disabled={isAtFullCapacity(item, 'ticket') && !isCurrentlyPrimary(item, 'ticket')}
                                                    >
                                                        <div className="flex flex-col gap-1 items-start text-start">
                                                            <span>
                                                                {item.name}
                                                            </span>

                                                            {
                                                                isAtFullCapacity(item, 'ticket') && !isCurrentlyPrimary(item, 'ticket') && (
                                                                    <span className='text-xs text-white/50 italic'>
                                                                        This ticket is at full capacity, remove at least 1 guest to select this ticket.
                                                                    </span>
                                                                )
                                                            }
                                                        </div>
                                                    </SelectItem>
                                                ))
                                            }
                                        </SelectGroup>

                                    ))
                                }
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <InputGroupAddon align="block-start">

                        <div className="flex gap-2">
                            <Label htmlFor="first-name" className='text-xs'>
                                Select Primary Ticket
                            </Label>

                            <Tooltip>
                                <TooltipTrigger>
                                    <CircleQuestionMark size={14} />
                                </TooltipTrigger>
                                <TooltipContent side='bottom' align='center'>
                                    <p className='text-xs'>This is a tool tip</p>
                                </TooltipContent>
                            </Tooltip>

                        </div>
                    </InputGroupAddon>
                </InputGroup> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-4">

                    <InputGroup>
                        <InputGroupInput id="first-name" className='text-white ' {...register('first_name')} />
                        <InputGroupAddon align="block-start">
                            <Label htmlFor="first-name" className='text-xs'>
                                First Name
                            </Label>
                        </InputGroupAddon>
                    </InputGroup>

                    <InputGroup>
                        <InputGroupInput id="last-name" className='text-white' {...register('last_name')} />
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
                                {...register('birthdate')}
                            />
                            <InputGroupAddon align="block-start">
                                <Label htmlFor="birthdate" className='text-xs'>
                                    Birthdate
                                </Label>
                            </InputGroupAddon>
                        </InputGroup>

                        <p className={`absolute top-[calc(100%+6px)] left-0 text-xs ${errors.birthdate ? 'text-red-600' : 'text-white/50'}`}>Must be 18+ years old</p>

                    </div>

                </div>

                <hr className='my-10 mt-16 border-[#2c2d2c]' />

                <div className="flex gap-2 items-center">
                    <Users className="size-4 sm:size-5" />
                    <h2 className="text-lg sm:text-xl font-semibold">Other guest/s</h2>
                </div>

                {
                    tables.map((table, index: number) => (
                        <CartItemGuests key={index} item={{ type: 'table', ...table }} />
                    ))
                }

                {
                    tickets.map((ticket, index: number) => (
                        <CartItemGuests key={index} item={{ type: 'ticket', ...ticket }} />
                    ))
                }
            </div>
        </div>
    )
}

type CartItemGuestsProps = {
    item: CartItem
}

const CartItemGuests = ({ item }: CartItemGuestsProps) => {
    const { control, getValues } = useFormContext()

    const tickets: CartTicket[] = getValues('tickets')
    const tables: CartVenueTable[] = getValues('tables')

    const findItemIndex = () => {
        if (item.type === 'ticket') {
            return tickets.findIndex(ticket => ticket.event_ticket_type_id === item.event_ticket_type_id)
        }
        return tables.findIndex(table => table.venue_table_id === item.venue_table_id)
    }

    const fieldName = item.type === 'ticket' ? `tickets.${findItemIndex()}.guests` : `tables.${findItemIndex()}.guests`

    const { fields, append, remove } = useFieldArray({
        control,
        name: fieldName
    })


    const getCurrentItem = () => {
        const currentValues = getValues()
        return item.type === 'ticket'
            ? currentValues.tickets?.find((ticket: CartTicket) => ticket.event_ticket_type_id === item.event_ticket_type_id)
            : currentValues.tables?.find((table: CartVenueTable) => table.venue_table_id === item.venue_table_id)
    }

    const getMaxGuests = () => {
        const currentItem = getCurrentItem()
        if (!currentItem) return 0

        return currentItem.is_primary
            ? currentItem.max_capacity - 1  // Primary guest takes one spot
            : currentItem.max_capacity      // Full capacity if not primary
    }

    const isAtCapacity = fields.length >= getMaxGuests()

    const handleAddGuest = () => {
        if (isAtCapacity) {
            console.log(`Cannot add more guests. Max capacity: ${getMaxGuests()}`)
            return
        }

        append({
            full_name: '',
            age: 0
        })
    }

    return (
        <Accordion type="single" collapsible className='border border-[#2d2c2c] rounded px-4'>
            <AccordionItem value="item-1">
                <AccordionTrigger className='font-bold'>
                    <div className="flex items-center gap-4">
                        <Checkbox onClick={(e) => e.stopPropagation()} className='cursor-pointer' />
                        {
                            item.type === 'ticket' ? (
                                <p>
                                    {item.name}
                                </p>
                            ) : (
                                <p>
                                    {item.table_name} - {item.legend}
                                </p>
                            )
                        }
                    </div>
                </AccordionTrigger>
                <AccordionContent className='p-4 pt-2 pl-8'>
                    <div className="flex flex-col gap-5">
                        <>
                            {fields.map((field, index) => (
                                <GuestForm
                                    key={field.id}
                                    fieldName={`${fieldName}.${index}`}
                                    onRemove={() => remove(index)}
                                    index={index}
                                />
                            ))}

                            <div className="flex w-full justify-between items-end gap-3">
                                <Button
                                    type='button'
                                    onClick={handleAddGuest}
                                    variant={'outline'}
                                    className='w-fit'
                                    disabled={isAtCapacity}
                                >

                                    {
                                        !isAtCapacity ?
                                            <>
                                                Add Guest <Plus />
                                            </>
                                            :
                                            <p>Full Capacity</p>
                                    }

                                </Button>

                                <p className="text-xs text-white/70">
                                    Guests: {fields.length}/{getMaxGuests()}
                                </p>
                            </div>
                        </>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}

type GuestFormProps = {
    fieldName: string
    onRemove: () => void
    index: number
}

const GuestForm = ({ fieldName, onRemove, index }: GuestFormProps) => {

    const { register } = useFormContext()

    return (
        <div className="flex flex-col sm:flex-row gap-2">
            <InputGroup className="flex-1">
                <InputGroupInput
                    className="text-white"
                    {...register(`${fieldName}.full_name`)}
                    placeholder={`Full Name`}
                />
                <InputGroupAddon align="block-start">
                    <Label className="text-xs">{`Guest ${index + 1}`}</Label>
                </InputGroupAddon>
            </InputGroup>

            <InputGroup className="flex-1 sm:max-w-[120px]">
                <InputGroupInput
                    type="number"
                    className="text-white"
                    {...register(`${fieldName}.age`, { valueAsNumber: true })}
                    placeholder="Age"
                    onWheel={(e) => e.currentTarget.blur()}
                />
                <InputGroupAddon align="block-start">
                    <Label className="text-xs">Age</Label>
                </InputGroupAddon>
            </InputGroup>

            <Button onClick={onRemove} variant={'ghost'} size={'icon'} className="flex-shrink-0 self-start sm:self-auto"><Trash /></Button>
        </div>
    )
}