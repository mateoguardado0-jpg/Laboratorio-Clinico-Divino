import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

import { cn } from '@/lib/utils'

function Accordion({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn('uiAccordion', className)}
      {...props}
    />
  )
}

function AccordionItem({
  className,
  ...props
}) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn('uiAccordionItem', className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Header className="uiAccordionHeader">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn('uiAccordionTrigger', className)}
        {...props}
      >
        {children}
        <ChevronDown className="uiAccordionChevron" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className={cn('uiAccordionContent', className)}
      {...props}
    >
      <div className="uiAccordionContentInner">{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }
