'use client'

import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import { Button } from '../ui/button'

type CartFooterProps = {
    currentStep: number
    nextStep: () => void
    prevStep: () => void
}


export default function CartFooter({ currentStep, nextStep, prevStep }: CartFooterProps) {

    return (
        <CartOverview>
            <CartOverviewActions>
                {
                    currentStep > 1 && (
                        <Button variant="secondary" onClick={prevStep}>
                            Back
                        </Button>
                    )
                }
                {
                    currentStep < 5 && (
                        <Button variant="secondary" onClick={nextStep}>
                            Next
                        </Button>
                    )
                }

                {
                    currentStep === 5 && (
                        <Button variant="secondary" onClick={nextStep}>
                            Submit
                        </Button>
                    )
                }
            </CartOverviewActions>
        </CartOverview>
    )
}
