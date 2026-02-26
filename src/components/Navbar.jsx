import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'

function MenuIcon({ open }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
    >
      {open ? (
        <path
          fill="currentColor"
          d="M18.3 5.71 12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.29 19.71 2.88 18.29 9.17 12 2.88 5.71 4.29 4.29l6.3 6.31 6.3-6.31z"
        />
      ) : (
        <path
          fill="currentColor"
          d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z"
        />
      )}
    </svg>
  )
}

function makeLinkClass({ isActive }) {
  return `navLink ${isActive ? 'navLinkActive' : ''}`.trim()
}

export default function Navbar() {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = useMemo(
    () => [
      { to: '/', label: 'Inicio' },
      { to: '/nosotros', label: 'Nosotros' },
      { to: '/servicios', label: 'Servicios' },
      { to: '/contacto', label: 'Contacto' },
    ],
    [],
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToConsultas = () => {
    setOpen(false)
    navigate('/contacto#consultas')
  }

  return (
    <header className={`nav ${scrolled ? 'navScrolled' : ''}`.trim()}>
      <div className="container navInner">
        <NavLink to="/" className="brand" aria-label="Ir al inicio" onClick={() => setOpen(false)}>
          <span className="brandName">Laboratorio Clínico Divino Niño Jesus</span>
          <span className="brandTag">Atención profesional y resultados confiables</span>
        </NavLink>

        <nav className="navLinks" aria-label="Navegación principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={makeLinkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navActions">
          <button
            type="button"
            className="menuBtn"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="container">
          <div className="mobilePanel" role="dialog" aria-label="Menú móvil">
            {links.map((l) => (
              <NavLink
                key={`m-${l.to}`}
                to={l.to}
                className={makeLinkClass}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </NavLink>
            ))}
            <div className="dividerSoft" />
            <button type="button" className="btn btnPrimary" onClick={goToConsultas}>
              Consultas
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
