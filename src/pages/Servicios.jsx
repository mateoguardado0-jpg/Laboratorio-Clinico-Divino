const services = [
  {
    title: 'Hematología completa',
    desc: 'Indicadores esenciales para un seguimiento confiable.',
  },
  {
    title: 'Química clínica',
    desc: 'Paneles metabólicos y pruebas de rutina.',
  },
  {
    title: 'Perfil lipídico',
    desc: 'Control y prevención con resultados claros.',
  },
  {
    title: 'Glicemia y HbA1c',
    desc: 'Monitoreo y control con enfoque preventivo.',
  },
  {
    title: 'Inmunología',
    desc: 'Apoyo diagnóstico con procesos estandarizados.',
  },
  {
    title: 'Orina y heces',
    desc: 'Pruebas básicas con lectura cuidadosa y oportuna.',
  },
  {
    title: 'Marcadores generales',
    desc: 'Opciones de apoyo clínico según disponibilidad.',
  },
  {
    title: 'Pruebas rápidas',
    desc: 'Tiempo de respuesta ágil con comunicación clara.',
  },
  {
    title: 'Paquetes preventivos',
    desc: 'Chequeos recomendados para control periódico.',
  },
]

export default function Servicios() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">Servicios</div>
              <h1 className="h1">Un catálogo claro, moderno y fácil de explorar</h1>
              <p className="lead">
                Grid de servicios con cards modernas e interacción sutil al pasar el mouse.
                Sustituye títulos/descripciones por los de tu laboratorio.
              </p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label="Imagen servicios (placeholder)" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="gridCards">
            {services.map((s) => (
              <article key={s.title} className="card cardHover">
                <div className="cardPad stack">
                  <div className="imgPlaceholder imgWide" aria-hidden="true" />
                  <div className="stack">
                    <div className="eyebrow">{s.title}</div>
                    <p className="lead muted">{s.desc}</p>
                  </div>
                  <div className="btnRow">
                    <a className="btn btnPrimary" href="/contacto#cita">
                      Agendar Cita
                    </a>
                    <a className="btn btnSoft" href="/contacto">
                      Consultar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

