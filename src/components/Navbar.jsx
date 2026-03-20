import { NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../imagenlogo.png'
import { useI18n } from '../i18n/useI18n.jsx'

function MenuIcon({ open }) {
  return (
    <span className={`hamburgerIcon ${open ? 'hamburgerOpen' : ''}`} aria-hidden>
      <span className="hamburgerLine" />
      <span className="hamburgerLine" />
      <span className="hamburgerLine" />
    </span>
  )
}

function makeLinkClass({ isActive }) {
  return `navLink ${isActive ? 'navLinkActive' : ''}`.trim()
}

const SCROLL_THRESHOLD = 50

export default function Navbar() {
  const navigate = useNavigate()
  const { lang, setLang, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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
    setMounted(true)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goToConsultas = () => {
    setOpen(false)
    navigate('/contacto#consultas')
  }

  const headerClass = [
    'nav',
    mounted && 'navMounted',
    scrolled && 'navScrolled',
    scrolled && 'navCompact',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <header className={headerClass}>
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
          <button
            type="button"
            className="navCta btn btnPrimary"
            onClick={goToConsultas}
          >
            {t('nav.consultas')}
          </button>
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

      {open && (
        <>
          <button
            type="button"
            className="navOverlay"
            aria-label={t('nav.closeMenu')}
            onClick={() => setOpen(false)}
          />
          <div className="mobileMenuWrap">
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
                    className={({ isActive }) =>
                      `navLink ${isActive ? 'navLinkActive' : ''} mobileNavLink`.trim()
                    }
                    end={l.to === '/'}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </NavLink>
                ))}
                <div className="dividerSoft" />
                <button type="button" className="btn btnPrimary navCtaMobile" onClick={goToConsultas}>
                  {t('nav.consultas')}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
