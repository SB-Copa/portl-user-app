'use client'

import { usePathname } from 'next/navigation'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

type CartStep = {
    label: string
} & (
    | { path: string }
    | { paths: string[] }
)

const CART_STEPS: CartStep[] = [
    { path: '/cart/confirmation', label: 'Review' },
    { path: '/cart/details', label: 'Details' },
    { path: '/cart/payment', label: 'Payment' },
    { paths: ['/cart/checkout', '/cart/qr'], label: 'Checkout' }, // Checkout and QR pages
    { path: '/cart/success', label: 'Complete' },
]

export default function CartProgress() {
    const pathname = usePathname()
    
    // Find current step - check if pathname matches any step path or paths array
    const currentStepIndex = CART_STEPS.findIndex(step => {
        if ('path' in step) {
            return pathname.startsWith(step.path)
        }
        if ('paths' in step) {
            return step.paths.some((p: string) => pathname.startsWith(p))
        }
        return false
    })
    const activeStepIndex = currentStepIndex === -1 ? 0 : currentStepIndex
    const currentStep = CART_STEPS[activeStepIndex]

    return (
        <div className="w-full mb-6 sm:mb-8">
            {/* Mobile Design - Compact with progress bar */}
            <div className="block sm:hidden">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-xs text-white/70">Step</span>
                        <span className="text-sm font-semibold text-white">{activeStepIndex + 1}</span>
                        <span className="text-xs text-white/50">of</span>
                        <span className="text-sm font-semibold text-white">{CART_STEPS.length}</span>
                    </div>
                    <span className="text-sm font-medium text-white">{currentStep?.label}</span>
                </div>
                
                {/* Progress Bar */}
                <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                        className="absolute top-0 left-0 h-full bg-white transition-all duration-300 rounded-full"
                        style={{ width: `${((activeStepIndex + 1) / CART_STEPS.length) * 100}%` }}
                    />
                </div>
                
                {/* Step Indicators */}
                <div className="flex items-center justify-between mt-3">
                    {CART_STEPS.map((step, index) => {
                        const isActive = index === activeStepIndex
                        const isCompleted = index < activeStepIndex
                        const stepKey = 'path' in step ? step.path : ('paths' in step ? step.paths[0] : `step-${index}`)

                        return (
                            <div key={stepKey} className="flex flex-col items-center flex-1">
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded-full border-2 transition-colors",
                                        "w-6 h-6",
                                        isCompleted && "bg-white border-white",
                                        isActive && !isCompleted && "border-white bg-transparent",
                                        !isActive && !isCompleted && "border-white/30 bg-transparent"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={12} className="text-black" />
                                    ) : isActive ? (
                                        <div className="w-2 h-2 rounded-full bg-white" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-white/30" />
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Desktop Design - Full horizontal stepper */}
            <div className="hidden sm:flex items-center justify-between w-full">
                {CART_STEPS.map((step, index) => {
                    const isActive = index === activeStepIndex
                    const isCompleted = index < activeStepIndex
                    const isLast = index === CART_STEPS.length - 1
                    const stepKey = 'path' in step ? step.path : ('paths' in step ? step.paths[0] : `step-${index}`)

                    return (
                        <div key={stepKey} className="flex items-center flex-1">
                            <div className="flex flex-col items-center flex-1">
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded-full border-2 transition-colors flex-shrink-0",
                                        "w-10 h-10",
                                        isCompleted && "bg-white text-black border-white",
                                        isActive && !isCompleted && "border-white bg-transparent text-white",
                                        !isActive && !isCompleted && "border-white/30 bg-transparent text-white/30"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check size={20} className="text-black" />
                                    ) : (
                                        <span className="text-sm font-medium">{index + 1}</span>
                                    )}
                                </div>
                                <span
                                    className={cn(
                                        "mt-2 text-xs text-center w-full px-0.5",
                                        isActive && "text-white font-medium",
                                        !isActive && "text-white/50"
                                    )}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {!isLast && (
                                <div
                                    className={cn(
                                        "h-0.5 flex-1 mx-2 mt-5 transition-colors",
                                        isCompleted ? "bg-white" : "bg-white/30"
                                    )}
                                />
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

