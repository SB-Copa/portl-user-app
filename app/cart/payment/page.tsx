'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function Payment() {
    const { register, watch, setValue, formState: { errors } } = useFormContext()
    const selectedMethod = watch('payment.method') ?? 'qrph'

    const handleMethodChange = (value: string | undefined) => {
        if (!value) return
        setValue('payment.method', value, {
            shouldValidate: true,
            shouldDirty: true,
        })
    }

    const paymentErrors = errors?.payment as Record<string, unknown> | undefined
    const qrphErrors = paymentErrors?.qrph as Partial<Record<'name' | 'email' | 'phone', { message?: string }>> | undefined

    return (
        <div className="flex flex-col gap-6 sm:gap-10">

            <div className="flex flex-col gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">Billing Details</h2>
                <InputGroup>
                    <InputGroupInput
                        placeholder="Full Name"
                        className='text-white'
                        {...register('payment.qrph.name')}
                    />
                    <InputGroupAddon align="block-start">
                        <Label className='text-xs'>Name</Label>
                    </InputGroupAddon>
                </InputGroup>
                {qrphErrors?.name?.message && (
                    <p className="text-xs text-red-500">{qrphErrors.name.message as string}</p>
                )}

                <InputGroup>
                    <InputGroupInput
                        type="email"
                        placeholder="Email (optional)"
                        className='text-white'
                        {...register('payment.qrph.email')}
                    />
                    <InputGroupAddon align="block-start">
                        <Label className='text-xs'>Email</Label>
                    </InputGroupAddon>
                </InputGroup>
                {qrphErrors?.email?.message && (
                    <p className="text-xs text-red-500">{qrphErrors.email.message as string}</p>
                )}

                <InputGroup>
                    <InputGroupInput
                        placeholder="Phone Number"
                        className='text-white'
                        {...register('payment.qrph.phone')}
                    />
                    <InputGroupAddon align="block-start">
                        <Label className='text-xs'>Phone Number</Label>
                    </InputGroupAddon>
                </InputGroup>
                {qrphErrors?.phone?.message && (
                    <p className="text-xs text-red-500">{qrphErrors.phone.message as string}</p>
                )}
            </div>


            <div className="flex flex-col gap-4">
                <h2 className="text-lg sm:text-xl font-semibold">Payment Method</h2>
                <RadioGroup>
                    <div className="flex items-center gap-3">
                        <RadioGroupItem value="qrph" id="qrph" />
                        <Label htmlFor="qrph">QRPH</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

