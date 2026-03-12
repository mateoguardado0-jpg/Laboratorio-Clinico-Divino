import { useState } from 'react'
import { useI18n } from '../i18n/useI18n.jsx'

export default function Preguntas() {
  const { t, get } = useI18n()
  const faqs = get('faq.items', [])
  const [activeIndex, setActiveIndex] = useState(0)

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index))
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="stackLg">
            <div className="eyebrow">{t('faq.eyebrow')}</div>
            <h1 className="h1">{t('faq.title')}</h1>
            <p className="lead muted">{t('faq.lead')}</p>

            <div className="faqList">
              {faqs.map((item, index) => {
                const isOpen = activeIndex === index
                return (
                  <article
                    key={item.question}
                    className={`faqItem card ${isOpen ? 'faqItemOpen' : ''}`.trim()}
                  >
                    <button
                      type="button"
                      className="faqHeader"
                      onClick={() => handleToggle(index)}
                      onMouseEnter={() => setActiveIndex(index)}
                      aria-expanded={isOpen}
                    >
                      <span className="faqTitle">{item.question}</span>
                      <span className="faqIcon" aria-hidden>
                        ˅
                      </span>
                    </button>
                    <div className="faqBody">
                      <p className="lead muted">{item.answer}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

