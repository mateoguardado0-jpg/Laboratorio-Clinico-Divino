import { useState } from 'react'

const faqs = [
  {
    question: '¿Puedo realizarme exámenes sin cita previa?',
    answer:
      'Sí, atendemos sin cita en horario laboral. Sin embargo, agendar previamente te permite reducir tiempos de espera.',
  },
  {
    question: '¿Atienden a niños y adultos mayores?',
    answer:
      'Sí, contamos con personal capacitado para la toma de muestras en pacientes de todas las edades.',
  },
  {
    question: '¿Qué documentos debo presentar?',
    answer:
      'Generalmente solo necesitas un documento de identificación y la orden médica si tu examen lo requiere.',
  },
  {
    question: '¿Necesito estar en ayunas para realizarme un examen?',
    answer:
      'Depende del tipo de análisis. Algunos estudios, como la glucosa o el perfil lipídico, requieren ayuno de 8 a 12 horas. Te recomendamos consultar previamente las indicaciones específicas.',
  },
  {
    question: '¿Es necesario llevar orden médica?',
    answer:
      'Algunos exámenes requieren indicación médica, mientras que otros pueden realizarse por solicitud directa del paciente.',
  },
  {
    question: '¿Cómo debo prepararme para mi examen?',
    answer:
      'Las indicaciones varían según el estudio. Nuestro equipo te brindará las recomendaciones necesarias al momento de agendar tu cita.',
  },
  {
    question: '¿Puedo hacerme varios exámenes el mismo día?',
    answer:
      'Sí, en la mayoría de los casos es posible realizar múltiples estudios en una sola visita, siempre que se cumplan las indicaciones de preparación correspondientes.',
  },
  {
    question: '¿Cuánto tiempo tardan en entregarse los resultados?',
    answer:
      'La mayoría de los exámenes se entregan el mismo día o dentro de 24 horas. Algunos estudios especializados pueden requerir más tiempo.',
  },
  {
    question: '¿Cómo puedo recibir mis resultados?',
    answer:
      'Puedes recibirlos en nuestras instalaciones o, si el servicio está disponible, mediante envío digital al correo electrónico registrado.',
  },
  {
    question: '¿La información de mis resultados es confidencial?',
    answer:
      'Sí, garantizamos la protección y confidencialidad de todos los datos y resultados conforme a los estándares de seguridad y ética profesional.',
  },
  {
    question: '¿Aceptan seguros médicos?',
    answer:
      'Trabajamos con distintas aseguradoras. Te recomendamos consultar directamente para confirmar cobertura y requisitos.',
  },
  {
    question: '¿Cada cuánto tiempo debo realizarme exámenes de rutina?',
    answer:
      'Se recomienda realizar un chequeo general al menos una vez al año. Sin embargo, la frecuencia puede variar según la edad, antecedentes médicos y recomendaciones de tu médico.',
  },
  {
    question: '¿Qué tan importante es hacerse exámenes aunque me sienta bien?',
    answer:
      'Muchos padecimientos pueden desarrollarse sin síntomas visibles. Los análisis clínicos permiten detectar alteraciones de manera temprana y prevenir complicaciones futuras.',
  },
  {
    question: '¿A partir de qué edad debo comenzar a realizarme chequeos preventivos?',
    answer:
      'Los controles pueden iniciarse desde la adolescencia, pero a partir de los 30 años se recomienda mayor seguimiento preventivo, especialmente si existen antecedentes familiares.',
  },
  {
    question: '¿Qué exámenes forman parte de un chequeo básico?',
    answer:
      'Generalmente incluyen hemograma completo, glucosa, perfil lipídico y examen general de orina. El médico puede indicar estudios adicionales según cada caso.',
  },
]

export default function Preguntas() {
  const [activeIndex, setActiveIndex] = useState(0)

  const handleToggle = (index) => {
    setActiveIndex((current) => (current === index ? null : index))
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="stackLg">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h1 className="h1">Resolvemos tus dudas más habituales</h1>
            <p className="lead muted">
              Encuentra respuestas claras sobre preparación, tiempos de entrega y aspectos prácticos de tus
              exámenes de laboratorio. Si aún tienes dudas, siempre puedes escribirnos en la sección de
              contacto.
            </p>

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

