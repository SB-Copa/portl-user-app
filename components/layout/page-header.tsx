'use client'

import * as React from 'react'
import { Button } from '../ui/button'
import { ArrowLeftIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'

function PageHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header"
      className={cn("flex flex-col w-full", className)}
      {...props}
    />
  )
}

function PageHeaderContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-content"
      className={cn("flex flex-col gap-2 items-start", className)}
      {...props}
    />
  )
}

function PageHeaderBackButton({ 
  className, 
  href, 
  onClick,
  children,
  ...props 
}: React.ComponentProps<'button'> & {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
}) {
  const router = useRouter()

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button 
      variant="ghost" 
      onClick={handleClick}
      className={cn("w-fit", className)}
      {...props}
    >
      <ArrowLeftIcon size={10} />   
      {children}
    </Button>
  )
}

function PageHeaderTitle({ 
  className, 
  asChild = false, 
  ...props 
}: React.ComponentProps<'h1'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "h1"
  
  // When using asChild, don't apply base classes that might conflict
  // Let the child element handle all styling
  const baseClasses = asChild ? "" : "text-2xl lg:text-4xl font-medium uppercase"
  
  return (
    <Comp
      data-slot="page-header-title"
      className={cn(baseClasses, className)}
      {...props}
    />
  )
}

function PageHeaderDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="page-header-description"
      className={cn("text-sm text-gray-500", className)}
      {...props}
    />
  )
}

function PageHeaderText({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="page-header-text"
      className={cn("flex flex-col", className)}
      {...props}
    />
  )
}

export {
  PageHeader,
  PageHeaderContent,
  PageHeaderBackButton,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderText,
}
