import { HiOutlineHeart, HiOutlineBadgeCheck, HiOutlineFlag, HiOutlineHand } from 'react-icons/hi'

const valores = [
  { titulo: 'Confianza', desc: 'Trabajamos con transparencia y rigor para que pacientes y médicos confíen en nuestros resultados.', icon: HiOutlineHeart },
  { titulo: 'Calidad', desc: 'Procesos estandarizados y control continuo en cada etapa del análisis.', icon: HiOutlineBadgeCheck },
  { titulo: 'Compromiso', desc: 'Dedicación con cada paciente y con el cumplimiento de plazos y estándares.', icon: HiOutlineFlag },
  { titulo: 'Respeto', desc: 'Trato digno, confidencialidad y escucha en cada interacción.', icon: HiOutlineHand },
]

const team = [
  { name: 'Dirección técnica', role: 'Supervisión clínica', bio: 'Experiencia y supervisión de resultados.' },
  { name: 'Área de laboratorio', role: 'Análisis y control', bio: 'Control de calidad y procesos estandarizados.' },
  { name: 'Atención al paciente', role: 'Orientación', bio: 'Acompañamiento y requisitos de cada estudio.' },
  { name: 'Recepción', role: 'Citas y seguimiento', bio: 'Gestión de citas y entrega de resultados.' },
]

export default function Nosotros() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">Nosotros</div>
              <h1 className="h1">Un laboratorio con enfoque humano y profesional</h1>
              <p className="lead">
                Somos un laboratorio comprometido con la calidad, el trato humano y la entrega
                oportuna de resultados. Conoce nuestra historia, misión y equipo.
              </p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label="Laboratorio Divino Niño Jesus" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="grid2Reverse">
            <div className="imgPlaceholder imgWide" aria-label="Nuestra historia" />
            <div className="stackLg">
              <h2 className="h2">Historia</h2>
              <p className="lead">
                Nacimos con el propósito de ofrecer análisis clínicos confiables y una atención
                cercana a la comunidad. Con el tiempo hemos incorporado tecnología y procesos
                que nos permiten mantener altos estándares de calidad y plazos de entrega claros.
              </p>
              <div className="btnRow">
                <a className="btn btnSoft" href="/contacto#consultas">
                  Consultas
                </a>
                <a className="btn" href="/servicios">
                  Ver servicios
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <h2 className="h2">Misión y visión</h2>
              <div className="stack">
                <div className="card cardPad">
                  <div className="eyebrow">Misión</div>
                  <p className="lead">
                    Brindar servicios clínicos confiables, con procesos claros, atención cercana y
                    enfoque en la seguridad del paciente.
                  </p>
                </div>
                <div className="card cardPad">
                  <div className="eyebrow">Visión</div>
                  <p className="lead">
                    Ser un referente local por la calidad, la innovación y una experiencia de
                    atención moderna y accesible.
                  </p>
                </div>
              </div>
            </div>
            <div className="imgPlaceholder imgWide" aria-label="Misión y visión" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <div className="eyebrow">Nuestros valores</div>
            <h2 className="h2">Valores</h2>
            <p className="lead muted">
              Los principios que guían nuestro trabajo día a día.
            </p>
            <div className="gridCards">
              {valores.map((v) => {
                const Icon = v.icon
                return (
                  <article key={v.titulo} className="card cardHover">
                    <div className="cardPad stack">
                      <span className="flexIcon">
                        <Icon className="iconLg" aria-hidden style={{ color: 'var(--c-pink-soft)' }} />
                        <div className="eyebrow" style={{ marginBottom: 0 }}>{v.titulo}</div>
                      </span>
                      <p className="lead muted">{v.desc}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">Equipo</h2>
            <p className="lead muted">
              Profesionales dedicados a la calidad analítica y a la atención al paciente.
            </p>

            <div className="gridTeam">
              {team.map((m) => (
                <article key={m.role} className="card cardHover">
                  <div className="cardPad stack">
                    <div className="imgPlaceholder imgSquare" aria-hidden="true" />
                    <div className="stack">
                      <div className="eyebrow">{m.role}</div>
                      <div className="lead" style={{ fontWeight: 800 }}>
                        {m.name}
                      </div>
                      <p className="lead muted">{m.bio}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

