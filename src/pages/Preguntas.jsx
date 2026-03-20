import { useState } from 'react'
import { useI18n } from '../i18n/useI18n.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function Preguntas() {
  const { t, get } = useI18n()
  const faqs = get('faq.items', [])
  const [activeIndex, setActiveIndex] = useState('0')

  const handleToggle = (value) => {
    setActiveIndex((current) => (current === value ? '' : value))
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="stackLg">
            <h1 className="h1">{t('faq.title')}</h1>
            <p className="lead muted">{t('faq.lead')}</p>

            <Accordion
              type="single"
              collapsible
              value={activeIndex}
              onValueChange={(value) => setActiveIndex(value)}
              className="max-w-lg rounded-lg border"
            >
              {faqs.map((item, index) => {
                const value = String(index)
                return (
                  <AccordionItem
                    key={item.question}
                    value={value}
                    className="border-b px-4 last:border-b-0"
                  >
                    <AccordionTrigger
                      onClick={() => handleToggle(value)}
                      onMouseEnter={() => setActiveIndex(value)}
                    >
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="lead muted">{item.answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  )
}

