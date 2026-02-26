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
              <h1 className="h1">Precisión clínica con una experiencia moderna</h1>
              <p className="lead">
                Bienvenido a un espacio donde la precisión y el compromiso se unen para cuidar tu salud.
                Ofrecemos análisis clínicos confiables, tecnología moderna y una atención cercana que
                te brinda la tranquilidad que necesitas.
              </p>
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
              <div className="btnRow">
                <Link to="/contacto#consultas" className="btn btnPrimary">
                  Consultas
                </Link>
                <Link to="/servicios" className="btn btnSoft">
                  Ver servicios
                </Link>
              </div>
            </div>
            <div className="imgPlaceholder imgHero heroImage" aria-label="Laboratorio Clínico Divino Niño Jesus" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">Servicios destacados</h2>
            <p className="lead muted">
              Hematología, química clínica, perfil lipídico e inmunología. Cada servicio con
              exámenes, requisitos y tiempos de entrega claros.
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
                      <Link to="/contacto#consultas" className="btn btnPrimary">
                        Consultas
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
                <div className="imgPlaceholder imgWide" aria-label="Consultas" />
                <div className="stackLg">
                  <div className="eyebrow">Listo para atenderte</div>
                  <h2 className="h2">Envía tu consulta en menos de un minuto</h2>
                  <p className="lead">
                    Escribe tus datos y tu consulta. Te responderemos a la brevedad.
                  </p>
                  <div className="btnRow">
                    <Link to="/contacto#consultas" className="btn btnPrimary">
                      Consultas
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
