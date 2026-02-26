import { Link, useParams, Navigate } from 'react-router-dom'
import { HiOutlineBeaker, HiOutlineArrowLeft } from 'react-icons/hi'
import { servicios } from '../data/servicios.js'

export default function ServicioDetalle() {
  const { slug } = useParams()
  const servicio = servicios.find((s) => s.slug === slug)

  if (!servicio) {
    return <Navigate to="/servicios" replace />
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="stackLg">
            <Link
              to="/servicios"
              className="flexIcon btn btnSoft"
              style={{ width: 'fit-content' }}
            >
              <HiOutlineArrowLeft className="iconSm" aria-hidden />
              Volver a Servicios
            </Link>

            <div className="flexIcon" style={{ marginBottom: '8px' }}>
              <HiOutlineBeaker className="iconLg" aria-hidden style={{ color: 'var(--c-blue)' }} />
              <div className="eyebrow" style={{ marginBottom: 0 }}>Servicio</div>
            </div>
            <h1 className="h1">{servicio.title}</h1>
            <p className="lead">{servicio.desc}</p>

            <div className="stackLg" style={{ marginTop: 'var(--space-6)' }}>
              <h2 className="h2">Exámenes</h2>
              <p className="lead muted">
                Requisitos y tiempo de entrega por examen. Consulta con el laboratorio para
                condiciones especiales.
              </p>

              <div className="stack" style={{ gap: 'var(--space-6)' }}>
                {servicio.examenes.map((examen) => (
                  <article key={examen.nombre} className="card cardPad">
                    <div className="stack">
                      <h3 className="lead" style={{ fontWeight: 600, margin: 0 }}>
                        {examen.nombre}
                      </h3>
                      <div className="stack" style={{ gap: 'var(--space-2)' }}>
                        <div>
                          <span className="help" style={{ display: 'block', marginBottom: '4px' }}>
                            Requisitos
                          </span>
                          <ul className="lead muted" style={{ margin: 0, paddingLeft: '1.25rem' }}>
                            {examen.requisitos.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="help" style={{ display: 'block', marginBottom: '4px' }}>
                            Tiempo de entrega
                          </span>
                          <p className="lead" style={{ margin: 0, fontWeight: 500 }}>
                            {examen.tiempoEntrega}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="btnRow" style={{ marginTop: 'var(--space-6)' }}>
                <Link to="/contacto#consultas" className="btn btnPrimary">
                  Consultas
                </Link>
                <Link to="/servicios" className="btn btnSoft">
                  Ver todos los servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
