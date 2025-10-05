"use client"

import { TabsContent } from '@/components/ui/tabs'
import React, { useState } from 'react'
import StepOne from './FormStepOne'
import StepTwo from './FormStepTwo'
import StepThree from './FormStepThree'
import StepFour from './FormStepFour'
import StepFive from './FormStepFive'
import { Form } from '@/components/ui/form'
import { fullFormSchema, stepOneSchema, stepTwoSchema } from '@/schema/TicketSchema'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

export default function BuyTicketForm() {

    const [currentStep, setCurrentStep] = useState(1)

    const form = useForm<z.infer<typeof fullFormSchema>>({
        resolver: zodResolver(fullFormSchema),
        mode: 'onChange'
    })

    const stepSchemas = [
        stepOneSchema,
        stepTwoSchema
    ]

    const nextStep = async () => {
        const schema = stepSchemas[currentStep - 1]
        const values = form.getValues()
        const result = schema.safeParse(values)

        if (!result.success) {
            // trigger validation for this step
            await form.trigger(Object.keys(schema.shape) as any)
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
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <TabsContent value="step1">
                    <StepOne />
                </TabsContent>
                <TabsContent value="step2">
                    <StepTwo />
                </TabsContent>
                <TabsContent value="step3">
                    <StepThree />
                </TabsContent>
                <TabsContent value="step4">
                    <StepFour />
                </TabsContent>
                <TabsContent value="step5">
                    <StepFive />
                </TabsContent>

                <div className="mt-4 flex justify-between">
                    {currentStep > 1 && (
                        <Button
                            type="button"
                            onClick={prevStep}
                        >
                            Back
                        </Button>
                    )}

                    {currentStep < 5 ? (
                        <Button
                            type="button"
                            onClick={nextStep}
                        >
                            Next
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                        >
                            Submit
                        </Button>
                    )}
                </div>
            </form>

        </Form>
    )
}
