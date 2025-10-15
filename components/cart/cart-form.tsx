'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CartList from '@/app/cart/cart-list'
import useCart from '@/hooks/use-cart'
import UserDetails from './user-details'
import { Form } from '../ui/form'
import { fullFormSchema, stepOneSchema, stepTwoSchema } from '@/schema/cart-schema'
import CartFooter from './cart-footer'

export default function CartForm() {
    const [currentStep, setCurrentStep] = useState(1)

    const { cart } = useCart()
    const form = useForm<z.infer<typeof fullFormSchema>>({
        resolver: zodResolver(fullFormSchema),
        defaultValues: {
            tickets: cart.tickets,
            tables: cart.tables
        }
    })

    // Remove the useEffect that was causing infinite loops
    // The form already gets cart data through defaultValues

    useEffect(() => {
        form.reset({
            tickets: cart.tickets,
            tables: cart.tables
        })
    }, [cart])

    const stepSchemas = [
        stepOneSchema,
        stepTwoSchema
    ]

    const nextStep = async () => {
        const schema = stepSchemas[currentStep - 1]
        const values = form.getValues()



        console.log(values);
        const result = schema.safeParse(values)

        if (!result.success) {
            // trigger validation for this step
            await form.trigger(Object.keys(schema.shape) as (keyof z.infer<typeof schema>)[])
            return
        }

        setCurrentStep((s) => Math.min(s + 1, 5))
    }

    const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1))

    const onSubmit = (data: z.infer<typeof fullFormSchema>) => {
        console.log("✅ Final form data:", data)
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                {/* <Tabs value={`step${currentStep}`} defaultValue="step1" className="flex-1 w-full flex flex-col gap-10">
                    <TabsList className='flex w-full bg-transparent gap-0 rounded-none p-0'>
                        <StepTabsTrigger className={currentStep <= 1 ? 'border-b-white/30' : 'border-b-white text-white'} value="step1"></StepTabsTrigger>
                        <StepTabsTrigger className={currentStep <= 2 ? 'border-b-white/30' : 'border-b-white text-white'} value="step2"></StepTabsTrigger>
                        <StepTabsTrigger className={currentStep <= 3 ? 'border-b-white/30' : 'border-b-white text-white'} value="step3"></StepTabsTrigger>
                        <StepTabsTrigger className={currentStep <= 4 ? 'border-b-white/30' : 'border-b-white text-white'} value="step4"></StepTabsTrigger>
                        <StepTabsTrigger className={currentStep <= 5 ? 'border-b-white/30' : 'border-b-white text-white'} value="step5"></StepTabsTrigger>
                    </TabsList>

                    <TabsContent value="step1">
                        <CartList />
                    </TabsContent>
                    <TabsContent value="step2">
                        <UserDetails />
                    </TabsContent>
                    <TabsContent value="step3">
                        <p>Payment</p>
                    </TabsContent>
                    <TabsContent value="step4">
                        <p>Under Construction</p>
                    </TabsContent>
                    <TabsContent value="step5">
                        <p>Under Construction</p>
                    </TabsContent>

                    </Tabs> */}
                <RenderStep currentStep={currentStep} prevStep={prevStep}/>
                <CartFooter currentStep={currentStep} nextStep={nextStep} prevStep={prevStep} />
            </form>
        </Form>
    )
}


const RenderStep = ({ currentStep, prevStep }: { currentStep: number, prevStep: () => void }) => {
    switch (currentStep) {
        case 1:
            return <CartList />
        case 2:
            return <UserDetails prevStep={prevStep} />
        case 3:
            return <p>Payment</p>
    }
}