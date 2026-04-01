import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import logo from '../../imagenlogo.png'
import { useI18n } from '../i18n/useI18n.jsx'
import PillNav from './PillNav.jsx'

const SCROLL_THRESHOLD = 50

function resolveActiveHref(pathname, links) {
  const sorted = [...links].sort((a, b) => b.to.length - a.to.length)
  for (const l of sorted) {
    if (l.to === '/') {
      if (pathname === '/') return '/'
    } else if (pathname.startsWith(l.to)) {
      return l.to
    }
  }
  return undefined
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { lang, setLang, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
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

  const items = useMemo(() => links.map((l) => ({ label: l.label, href: l.to })), [links])

  const activeHref = useMemo(() => resolveActiveHref(location.pathname, links), [location.pathname, links])

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
        <div className="navPillGroup">
          <PillNav
            logo={logo}
            logoAlt={t('brand.name')}
            brandName={t('brand.name')}
            items={items}
            activeHref={activeHref}
            className="navPillNav"
            ariaLabel={t('nav.mainNav')}
            ease="power2.easeOut"
            baseColor="#ffffff"
            pillColor="#4a90e2"
            hoveredPillTextColor="#1e3a5f"
            pillTextColor="#ffffff"
            initialLoadAnimation
            mobileMenuFooter={({ closeMenu }) => (
              <button
                type="button"
                className="btn btnPrimary navCtaMobile"
                onClick={() => {
                  goToConsultas()
                  closeMenu()
                }}
              >
                {t('nav.consultas')}
              </button>
            )}
          />
        </div>

        <div className="navActions">
          <button type="button" className="navCta btn btnPrimary" onClick={goToConsultas}>
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
        </div>
      </div>
    </header>
  )
}
