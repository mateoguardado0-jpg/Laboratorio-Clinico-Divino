import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState, useRef, useEffect } from 'react'
import { HiOutlineBeaker, HiOutlineSearch } from 'react-icons/hi'
import { servicios } from '../data/servicios.js'

function buildExamIndex() {
  const list = []
  servicios.forEach((s) => {
    s.examenes.forEach((e) => {
      list.push({ slug: s.slug, serviceTitle: s.title, examNombre: e.nombre })
    })
  })
  return list
}

const examIndex = buildExamIndex()

export default function Servicios() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const wrapperRef = useRef(null)

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (q.length < 2) return []
    return examIndex.filter((item) =>
      item.examNombre.toLowerCase().includes(q) || item.serviceTitle.toLowerCase().includes(q)
    )
  }, [query])

  useEffect(() => {
    function handleClickOutside(ev) {
      if (wrapperRef.current && !wrapperRef.current.contains(ev.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (slug) => {
    setQuery('')
    setOpen(false)
    navigate(`/servicios/${slug}`)
  }

  const handleKeyDown = (ev) => {
    if (ev.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
    if (ev.key === 'Enter' && matches.length === 1) {
      ev.preventDefault()
      handleSelect(matches[0].slug)
    }
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <span className="flexIcon" style={{ marginBottom: '8px' }}>
                <HiOutlineBeaker className="iconLg" aria-hidden style={{ color: 'var(--c-pink-soft)' }} />
                <div className="eyebrow" style={{ marginBottom: 0 }}>Servicios</div>
              </span>
              <h1 className="h1">Catálogo de servicios y exámenes</h1>
              <p className="lead">
                Hematología, química clínica, perfil lipídico e inmunología. Busca un examen por
                nombre arriba o explora cada servicio para ver requisitos y tiempos de entrega.
              </p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label="Servicios del laboratorio" />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div ref={wrapperRef} className="stackLg" style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
            <label className="label" htmlFor="buscar-examen">
              <span className="flexIcon">
                <HiOutlineSearch className="iconSm" aria-hidden style={{ color: 'var(--c-pink-soft)' }} />
                Buscar examen
              </span>
            </label>
            <input
              id="buscar-examen"
              type="search"
              className="input"
              placeholder="Escribe el nombre del examen o del servicio..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setOpen(true)
              }}
              onFocus={() => query.trim().length >= 2 && setOpen(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="buscar-examen-list"
              aria-expanded={open && matches.length > 0}
            />
            {open && matches.length > 0 ? (
              <ul
                id="buscar-examen-list"
                role="listbox"
                className="card cardPad stack"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  maxHeight: '280px',
                  overflowY: 'auto',
                  zIndex: 20,
                  gap: 0,
                }}
              >
                {matches.slice(0, 12).map((item, i) => (
                  <li key={`${item.slug}-${item.examNombre}-${i}`} role="option">
                    <button
                      type="button"
                      className="btn"
                      style={{
                        width: '100%',
                        justifyContent: 'flex-start',
                        textAlign: 'left',
                        padding: 'var(--space-3) var(--space-4)',
                        borderRadius: 'var(--radius-sm)',
                        border: 'none',
                        background: 'transparent',
                      }}
                      onClick={() => handleSelect(item.slug)}
                    >
                      <span className="lead" style={{ fontWeight: 500 }}>{item.examNombre}</span>
                      <span className="muted" style={{ fontSize: 13 }}> — {item.serviceTitle}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {query.trim().length >= 2 && matches.length === 0 ? (
              <p className="help" style={{ marginTop: '4px' }}>No se encontraron exámenes. Prueba con otras palabras.</p>
            ) : null}
          </div>

          <div className="gridCards">
            {servicios.map((s) => (
              <article key={s.slug} className="card cardHover">
                <div className="cardPad stack">
                  <div className="imgPlaceholder imgWide" aria-hidden="true" />
                  <div className="stack">
                    <span className="flexIcon">
                      <HiOutlineBeaker className="iconSm" aria-hidden style={{ color: 'var(--c-pink-soft)' }} />
                      <div className="eyebrow" style={{ marginBottom: 0 }}>{s.title}</div>
                    </span>
                    <p className="lead muted">{s.desc}</p>
                  </div>
                  <div className="btnRow">
                    <Link to="/contacto#consultas" className="btn btnPrimary">
                      Consultas
                    </Link>
                    <Link to={`/servicios/${s.slug}`} className="btn btnSoft">
                      Consultar
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

