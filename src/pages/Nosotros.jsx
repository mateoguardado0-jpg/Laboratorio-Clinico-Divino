const team = [
  { name: 'Dra. Equipo 1', role: 'Dirección técnica', bio: 'Experiencia y supervisión clínica.' },
  { name: 'Lic. Equipo 2', role: 'Laboratorio', bio: 'Control de calidad y procesos.' },
  { name: 'Asistente 3', role: 'Atención al paciente', bio: 'Acompañamiento y orientación.' },
  { name: 'Soporte 4', role: 'Recepción', bio: 'Gestión de citas y seguimiento.' },
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
                Este espacio está diseñado para contar tu historia con claridad, reforzar confianza
                y explicar tu forma de trabajo. Reemplaza los textos por los oficiales del
                laboratorio.
              </p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label="Imagen institucional (placeholder)" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="grid2Reverse">
            <div className="imgPlaceholder imgWide" aria-label="Imagen historia (placeholder)" />
            <div className="stackLg">
              <h2 className="h2">Historia</h2>
              <p className="lead">
                Un texto breve, honesto y directo sobre el origen del laboratorio, su crecimiento y
                su compromiso con la calidad. Mantén el contenido escaneable: párrafos cortos y
                ideas claras.
              </p>
              <div className="btnRow">
                <a className="btn btnSoft" href="/contacto#cita">
                  Agendar Cita
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
            <div className="imgPlaceholder imgWide" aria-label="Imagen misión/visión (placeholder)" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">Equipo</h2>
            <p className="lead muted">
              Cards con espacio para foto. Sustituye nombres/roles por los reales.
            </p>

            <div className="gridTeam">
              {team.map((m) => (
                <article key={m.name} className="card cardHover">
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

