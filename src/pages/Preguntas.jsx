import { useI18n } from '../i18n/useI18n.jsx'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

function AccordionFAQ({ items }) {
  return (
    <Accordion
      type="single"
      collapsible
      className="faqAccordion"
      defaultValue={items[0]?.value}
    >
      {items.map((item) => (
        <AccordionItem
          key={item.value}
          value={item.value}
          className="faqAccordionItem"
        >
          <AccordionTrigger className="faqAccordionTrigger">
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
      <section className="section">
        <div className="container">
          <div className="stackLg">
            <h1 className="h1">{t('faq.title')}</h1>
            <p className="lead muted">{t('faq.lead')}</p>

            <AccordionFAQ items={items} />
          </div>
        </div>
      </section>
    </main>
  )
}

