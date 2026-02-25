import FormularioCita from '../components/FormularioCita.jsx'

export default function Contacto() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">Contacto</div>
              <h1 className="h1">Conversemos y coordinemos tu cita</h1>
              <p className="lead">
                Aquí va tu información oficial: teléfono, correo, dirección y horarios. Incluimos
                un espacio para mapa y el formulario de cita con EmailJS.
              </p>

              <div className="gridCards">
                <div className="card cardPad">
                  <div className="eyebrow">Teléfono</div>
                  <p className="lead">+503 0000 0000</p>
                  <p className="help">Actualiza este dato por el número real.</p>
                </div>
                <div className="card cardPad">
                  <div className="eyebrow">Correo</div>
                  <p className="lead">citas@tulaboratorio.com</p>
                  <p className="help">El formulario enviará a tu correo vía EmailJS.</p>
                </div>
                <div className="card cardPad">
                  <div className="eyebrow">Horario</div>
                  <p className="lead">Lun–Sáb: 7:00–17:00</p>
                  <p className="help">Ajusta según tu operación.</p>
                </div>
              </div>
            </div>

            <div className="stackLg">
              <div className="card">
                <div className="cardPad stack">
                  <div className="eyebrow">Mapa</div>
                  <div
                    className="imgPlaceholder imgWide"
                    aria-label="Mapa (placeholder)"
                    role="img"
                  />
                  <p className="help">
                    Sustituye este bloque por un mapa embebido (Google Maps) cuando lo necesites.
                  </p>
                </div>
              </div>

              <div className="card">
                <div className="cardPad stack">
                  <div className="eyebrow">Mensaje</div>
                  <p className="lead">
                    Si prefieres un formulario de contacto simple aparte del de cita, puedes
                    reutilizar este diseño y enviar a tu correo.
                  </p>
                  <div className="btnRow">
                    <a className="btn btnSoft" href="#cita">
                      Ir a formulario de cita
                    </a>
                    <a className="btn" href="/servicios">
                      Ver servicios
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionTight" id="cita">
        <div className="container">
          <FormularioCita />
        </div>
      </section>
    </main>
  )
}

