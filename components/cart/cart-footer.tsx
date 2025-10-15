'use client'

import React from 'react'
import { CartOverview, CartOverviewActions } from './cart-overview'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

type CartFooterProps = {
    currentStep: number
    nextStep: () => void
    prevStep: () => void
}


export default function CartFooter({ currentStep, nextStep, prevStep }: CartFooterProps) {

    const getButtonLabelByStep = (step: number) => {
        switch (step) {
            case 1:
                return 'Next'
            case 2:
                return 'Payment'
        }
    }


    return (
        <CartOverview>
            <CartOverviewActions>

                <Button variant="default" onClick={nextStep}>
                    {getButtonLabelByStep(currentStep)}
                    <ArrowRight />
                </Button>
            </CartOverviewActions>
        </CartOverview>
    )
}
