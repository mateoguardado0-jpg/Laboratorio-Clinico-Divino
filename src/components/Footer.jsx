import { NavLink } from 'react-router-dom'
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div className="stack">
            <div className="brand">
              <span className="brandName">Laboratorio Clínico Divino Niño Jesus</span>
              <span className="brandTag">Cuidado clínico con calidez humana</span>
            </div>
            <div className="flexIcon footerSchedule">
              <HiOutlineClock className="iconSm" aria-hidden />
              <div>
                <strong>Horario de atención</strong>
                <br />
                <span className="muted">Lunes a viernes: 6:30&nbsp;a.m. a 4:00&nbsp;p.m.</span>
                <br />
                <span className="muted">Sábado: 6:30&nbsp;a.m. a 12:00&nbsp;m.d.</span>
              </div>
            </div>
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
            <div className="stack" style={{ gap: '10px' }}>
              <div className="flexIcon">
                <HiOutlinePhone className="iconSm" aria-hidden />
                <div><strong>Teléfono</strong><br /><span className="muted">+503 0000 0000</span></div>
              </div>
              <div className="flexIcon">
                <HiOutlineMail className="iconSm" aria-hidden />
                <div><strong>Correo</strong><br /><span className="muted">citas@tulaboratorio.com</span></div>
              </div>
              <div className="flexIcon">
                <HiOutlineLocationMarker className="iconSm" aria-hidden />
                <div><strong>Dirección</strong><br /><span className="muted">Tu dirección aquí</span></div>
              </div>
            </div>
            <p className="help" style={{ marginTop: '4px' }}>
              Reemplaza estos datos por los reales.
            </p>
          </div>
        </div>

        <div className="footerSmall">
          © {new Date().getFullYear()} Laboratorio Clínico Divino Niño Jesus. Todos los derechos
          reservados.
        </div>
      </div>
    </footer>
  )
}
