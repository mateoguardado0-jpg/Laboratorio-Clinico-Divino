import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../imagenlogo.png'
import { useI18n } from '../i18n/useI18n.jsx'

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
  const { lang, setLang, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const links = useMemo(
    () => [
      { to: '/', label: t('nav.home') },
      { to: '/nosotros', label: t('nav.about') },
      { to: '/servicios', label: t('nav.services') },
      { to: '/preguntas', label: t('nav.faq') },
      { to: '/contacto', label: t('nav.contact') },
    ],
    [t],
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
        <NavLink to="/" className="brand" aria-label={t('nav.goHome')} onClick={() => setOpen(false)}>
          <img src={logo} alt={t('brand.name')} className="brandLogo" />
          <span className="brandName">{t('brand.name')}</span>
        </NavLink>

        <nav className="navLinks" aria-label={t('nav.mainNav')}>
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={makeLinkClass} end={l.to === '/'}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="navActions">
          <div className="langSwitch" role="group" aria-label={t('nav.languageLabel')}>
            <button
              type="button"
              className={`langOption ${lang === 'es' ? 'langOptionActive' : ''}`.trim()}
              onClick={() => setLang('es')}
            >
              ES
            </button>
            <button
              type="button"
              className={`langOption ${lang === 'en' ? 'langOptionActive' : ''}`.trim()}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
          <button
            type="button"
            className="menuBtn"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      {open ? (
        <div className="container">
          <div className="mobilePanel" role="dialog" aria-label={t('nav.mobileMenu')}>
            <div className="langSwitch" role="group" aria-label={t('nav.languageLabel')}>
              <button
                type="button"
                className={`langOption ${lang === 'es' ? 'langOptionActive' : ''}`.trim()}
                onClick={() => setLang('es')}
              >
                ES
              </button>
              <button
                type="button"
                className={`langOption ${lang === 'en' ? 'langOptionActive' : ''}`.trim()}
                onClick={() => setLang('en')}
              >
                EN
              </button>
            </div>
            <div className="dividerSoft" />
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
              {t('nav.consultas')}
            </button>
          </div>
        </div>
      ) : null}
    </header>
  )
}
