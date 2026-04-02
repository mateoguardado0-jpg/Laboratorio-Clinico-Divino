import { useState } from 'react'
import { useI18n } from '../i18n/useI18n.jsx'
import ScrollRevealSection from '../components/ScrollRevealSection.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function AccordionFAQ({ items }) {
  const defaultValue = items[0]?.value ?? ''
  const [selectedValue, setSelectedValue] = useState(defaultValue)
  const [hoveredValue, setHoveredValue] = useState(null)

  return (
    <Accordion
      type="single"
      collapsible
      className="faqAccordion"
      value={hoveredValue ?? selectedValue}
      onValueChange={setSelectedValue}
      onMouseLeave={() => setHoveredValue(null)}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="faqAccordionItem"
        >
          <AccordionTrigger
            className="faqAccordionTrigger"
            onMouseEnter={() => setHoveredValue(item.value)}
          >
            {item.trigger}
          </AccordionTrigger>
          <AccordionContent className="faqAccordionContent">
            <p className="muted">{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default function Preguntas() {
  const { t, get } = useI18n()
  const faqs = get('faq.items', [])
  const items = faqs.map((item, index) => ({
    value: `faq-${index + 1}`,
    trigger: item.question,
    content: item.answer,
  }))

  return (
    <main className="page">
      <ScrollRevealSection className="section">
        <div className="container">
          <div className="stackLg">
            <h1 className="h1">{t('faq.title')}</h1>
            <p className="lead muted">{t('faq.lead')}</p>

            <AccordionFAQ items={items} />
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  )
}

