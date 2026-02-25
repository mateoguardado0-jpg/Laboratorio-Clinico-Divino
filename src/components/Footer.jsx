import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div className="stack">
            <div className="brand">
              <span className="brandName">Laboratorio Clínico Divino Niño</span>
              <span className="brandTag">Cuidado clínico con calidez humana</span>
            </div>
            <p className="lead muted">
              Horarios y datos de contacto pueden ajustarse según tu operación. Deja tus
              canales oficiales visibles y facilita el agendamiento desde cualquier dispositivo.
            </p>
          </div>

          <div className="stack">
            <div className="eyebrow">Navegación</div>
            <div className="stack">
              <NavLink className="navLink" to="/">
                Inicio
              </NavLink>
              <NavLink className="navLink" to="/nosotros">
                Nosotros
              </NavLink>
              <NavLink className="navLink" to="/servicios">
                Servicios
              </NavLink>
              <NavLink className="navLink" to="/contacto">
                Contacto
              </NavLink>
            </div>
          </div>

          <div className="stack">
            <div className="eyebrow">Contacto</div>
            <div className="stack">
              <div className="card cardPad">
                <div className="stack">
                  <div>
                    <strong>Teléfono:</strong> <span className="muted">+503 0000 0000</span>
                  </div>
                  <div>
                    <strong>Correo:</strong>{' '}
                    <span className="muted">citas@tulaboratorio.com</span>
                  </div>
                  <div>
                    <strong>Dirección:</strong>{' '}
                    <span className="muted">Tu dirección aquí</span>
                  </div>
                </div>
              </div>
              <p className="help">
                Reemplaza estos datos por los reales. El formulario de cita envía al correo que
                configures en EmailJS.
              </p>
            </div>
          </div>
        </div>

        <div className="footerSmall">
          © {new Date().getFullYear()} Laboratorio Clínico Divino Niño. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
