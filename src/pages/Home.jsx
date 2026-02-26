import { Link } from 'react-router-dom'
import { HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineShieldCheck } from 'react-icons/hi'

const featured = [
  {
    title: 'Hematología',
    desc: 'Análisis con control de calidad y entrega oportuna.',
  },
  {
    title: 'Química clínica',
    desc: 'Paneles esenciales con interpretación clara para tu médico.',
  },
  {
    title: 'Inmunología',
    desc: 'Pruebas orientadas a prevención y seguimiento.',
  },
]

export default function Home() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg heroContent">
              <div className="eyebrow">Laboratorio Clínico</div>
              <h1 className="h1">Precisión clínica con una experiencia moderna</h1>
              <p className="lead">
                Un sitio pensado para inspirar confianza: navegación clara, secciones limpias,
                y un flujo de agendamiento sencillo desde cualquier dispositivo.
              </p>
              <div className="btnRow">
                <Link to="/contacto#cita" className="btn btnPrimary">
                  Agendar Cita
                </Link>
                <Link to="/servicios" className="btn btnSoft">
                  Ver servicios
                </Link>
              </div>
              <div className="kpiRow">
                <div className="kpi">
                  <span className="flexIcon">
                    <HiOutlineUserGroup className="iconMd" aria-hidden />
                    <strong>Atención cercana</strong>
                  </span>
                  <span>Enfoque humano y profesional</span>
                </div>
                <div className="kpi">
                  <span className="flexIcon">
                    <HiOutlineClipboardList className="iconMd" aria-hidden />
                    <strong>Procesos claros</strong>
                  </span>
                  <span>Información directa y útil</span>
                </div>
                <div className="kpi">
                  <span className="flexIcon">
                    <HiOutlineShieldCheck className="iconMd" aria-hidden />
                    <strong>Resultados confiables</strong>
                  </span>
                  <span>Control de calidad y trazabilidad</span>
                </div>
              </div>
            </div>
            <div className="imgPlaceholder imgHero heroImage" aria-label="Imagen principal (placeholder)" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">Servicios destacados</h2>
            <p className="lead muted">
              Cards modernas con espacios para imagen. Puedes reemplazar los placeholders por
              fotos reales o ilustraciones.
            </p>

            <div className="gridCards">
              {featured.map((s) => (
                <article key={s.title} className="card cardHover">
                  <div className="cardPad stack">
                    <div className="imgPlaceholder imgWide" aria-hidden="true" />
                    <div className="stack">
                      <div className="eyebrow">{s.title}</div>
                      <p className="lead">{s.desc}</p>
                    </div>
                    <div className="btnRow">
                      <Link to="/servicios" className="btn btnSoft">
                        Ver más
                      </Link>
                      <Link to="/contacto#cita" className="btn btnPrimary">
                        Agendar
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ctaSection card">
            <div className="cardPad">
              <div className="grid2Reverse">
                <div className="imgPlaceholder imgWide" aria-label="Imagen CTA (placeholder)" />
                <div className="stackLg">
                  <div className="eyebrow">Listo para atenderte</div>
                  <h2 className="h2">Agenda tu cita en menos de un minuto</h2>
                  <p className="lead">
                    Coordina tu visita de forma sencilla. Las citas se envían directo a nuestro equipo.
                  </p>
                  <div className="btnRow">
                    <Link to="/contacto#cita" className="btn btnPrimary">
                      Agendar Cita
                    </Link>
                    <Link to="/contacto" className="btn">
                      Contacto
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
