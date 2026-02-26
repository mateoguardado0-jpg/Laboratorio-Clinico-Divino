import FormularioCita from '../components/FormularioCita.jsx'
import { HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineMap } from 'react-icons/hi'

export default function Contacto() {
  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">Contacto</div>
              <h1 className="h1">Conversemos y coordinemos tu consulta</h1>
              <p className="lead">
                Teléfono, correo, horarios y ubicación. En la sección inferior puedes enviar
                tu consulta con el formulario.
              </p>

              <div className="gridCards">
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlinePhone className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>Teléfono</div>
                  </div>
                  <p className="lead">+503 0000 0000</p>
                </div>
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineMail className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>Correo</div>
                  </div>
                  <p className="lead">citas@laboratoriodivinojesus.com</p>
                </div>
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineClock className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>Horario</div>
                  </div>
                  <p className="lead">Lun–Sáb: 7:00–17:00</p>
                </div>
              </div>
            </div>

            <div className="stackLg">
              <div className="card">
                <div className="cardPad stack">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineMap className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>Mapa</div>
                  </div>
                  <div
                    className="imgPlaceholder imgWide"
                    aria-label="Ubicación del laboratorio"
                    role="img"
                  />
                  <p className="help">Ubicación y direcciones. Puedes integrar Google Maps aquí.</p>
                </div>
              </div>

              <div className="card">
                <div className="cardPad stack">
                  <div className="eyebrow">Mensaje</div>
                  <p className="lead">
                    ¿Dudas o comentarios? Usa el formulario de consultas más abajo o contáctanos por
                    teléfono y correo.
                  </p>
                  <div className="btnRow">
                    <a className="btn btnSoft" href="#consultas">
                      Ir a consultas
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

      <section className="sectionTight" id="consultas">
        <div className="container">
          <FormularioCita />
        </div>
      </section>
    </main>
  )
}

