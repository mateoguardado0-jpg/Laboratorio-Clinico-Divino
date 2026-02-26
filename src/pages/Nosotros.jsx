import { HiOutlineHeart, HiOutlineBadgeCheck, HiOutlineFlag, HiOutlineHand } from 'react-icons/hi'

const valores = [
  {
    titulo: 'Precisión',
    desc: 'Trabajamos con exactitud científica para garantizar resultados confiables en cada análisis.',
    icon: HiOutlineBadgeCheck,
  },
  {
    titulo: 'Confidencialidad',
    desc: 'Protegemos la información de nuestros pacientes con absoluta discreción y seguridad.',
    icon: HiOutlineHand,
  },
  {
    titulo: 'Responsabilidad',
    desc: 'Asumimos cada estudio con compromiso ético y cumplimiento riguroso de los estándares sanitarios.',
    icon: HiOutlineFlag,
  },
  {
    titulo: 'Profesionalismo',
    desc: 'Contamos con personal altamente capacitado que actúa con ética, respeto y excelencia técnica.',
    icon: HiOutlineHeart,
  },
  {
    titulo: 'Innovación',
    desc: 'Incorporamos tecnología moderna y procesos actualizados para ofrecer diagnósticos más precisos y oportunos.',
    icon: HiOutlineBadgeCheck,
  },
  {
    titulo: 'Compromiso con la salud',
    desc: 'Contribuimos activamente al bienestar de la comunidad a través de un servicio humano y confiable.',
    icon: HiOutlineHeart,
  },
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
                Nuestro laboratorio nació con el propósito de ofrecer a la comunidad un servicio de
                análisis clínicos confiable, accesible y realizado con responsabilidad. Desde
                nuestros inicios, entendimos que detrás de cada muestra existe una persona que
                espera respuestas claras y oportunas para cuidar su salud.
              </p>
              <p className="lead">
                Con el paso del tiempo, hemos crecido incorporando tecnología moderna y
                fortaleciendo nuestro equipo profesional, manteniendo siempre el mismo
                compromiso: brindar resultados precisos con un trato humano y respetuoso.
              </p>
              <p className="lead">
                Hoy continuamos evolucionando, adaptándonos a los avances del sector salud, pero
                conservando la esencia que nos define: confianza, ética y cercanía con nuestros
                pacientes.
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
                    Ofrecer servicios de análisis clínicos con altos estándares de calidad, combinando
                    tecnología confiable y un equipo profesional comprometido, brindando a cada
                    paciente una atención respetuosa, clara y cercana.
                  </p>
                </div>
                <div className="card cardPad">
                  <div className="eyebrow">Visión</div>
                  <p className="lead">
                    Ser un laboratorio reconocido por la precisión de nuestros resultados y por el
                    trato humano que ofrecemos, convirtiéndonos en un referente de confianza y
                    excelencia en el cuidado de la salud.
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

