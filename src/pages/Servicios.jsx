import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState, useRef, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { getCatalogData } from '../data/servicios.js'
import { useI18n } from '../i18n/useI18n.jsx'

function serviciosPorArea(servicios, areasLaboratorio) {
  const porArea = new Map()
  areasLaboratorio.forEach((a) => porArea.set(a.id, { area: a, servicios: [] }))
  servicios.forEach((s) => {
    const grupo = porArea.get(s.areaId)
    if (grupo) grupo.servicios.push(s)
  })
  return areasLaboratorio.map((a) => ({ area: a, servicios: porArea.get(a.id).servicios })).filter((g) => g.servicios.length > 0)
}

/** Normaliza texto para búsqueda: minúsculas y sin acentos. */
function normalizar(texto) {
  if (!texto || typeof texto !== 'string') return ''
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
}

/** Índice ampliado: examen + servicio + área + texto de requisitos (para "incluye", etc.). */
function buildExamIndex(servicios, areasLaboratorio) {
  const list = []
  servicios.forEach((s) => {
    const area = areasLaboratorio.find((a) => a.id === s.areaId)
    const areaLabel = area ? area.label : ''
    s.examenes.forEach((e) => {
      const requisitosTexto = (e.requisitos || []).join(' ')
      list.push({
        slug: s.slug,
        serviceTitle: s.title,
        examNombre: e.nombre,
        areaLabel,
        searchText: `${e.nombre} ${s.title} ${areaLabel} ${requisitosTexto}`,
      })
    })
  })
  return list
}

/** Puntuación de relevancia: mayor = mejor coincidencia. */
function scoreMatch(item, qNorm, palabras) {
  const examNorm = normalizar(item.examNombre)
  const serviceNorm = normalizar(item.serviceTitle)
  const areaNorm = normalizar(item.areaLabel)
  const fullNorm = normalizar(item.searchText)

  let score = 0
  // Coincidencia exacta en nombre del examen
  if (examNorm === qNorm) return 100
  // Empieza por la query (nombre del examen)
  if (examNorm.startsWith(qNorm)) score += 50
  // Query contenida en nombre del examen
  else if (examNorm.includes(qNorm)) score += 40
  // Query en título del servicio
  if (serviceNorm.includes(qNorm)) score += 25
  // Query en nombre del área
  if (areaNorm.includes(qNorm)) score += 20
  // Query en texto completo (requisitos, "incluye", etc.)
  if (fullNorm.includes(qNorm)) score += 5

  // Búsqueda por varias palabras: todas deben aparecer en searchText
  if (palabras.length > 1) {
    const todasEncontradas = palabras.every((p) => fullNorm.includes(p))
    if (todasEncontradas) score = Math.max(score, 30)
  }

  return score
}

function buscar(query, examIndex) {
  const q = query.trim()
  if (q.length < 1) return []
  const qNorm = normalizar(q)
  const palabras = qNorm.split(/\s+/).filter(Boolean)

  const conPuntuacion = examIndex
    .filter((item) => {
      const fullNorm = normalizar(item.searchText)
      if (palabras.length === 1) return fullNorm.includes(qNorm)
      return palabras.every((p) => fullNorm.includes(p))
    })
    .map((item) => ({ item, score: scoreMatch(item, qNorm, palabras) }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)

  return conPuntuacion.map((x) => x.item)
}

export default function Servicios() {
  const navigate = useNavigate()
  const { t } = useI18n()
  const { servicios, areasLaboratorio } = useMemo(() => getCatalogData(t), [t])
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const wrapperRef = useRef(null)
  const listRef = useRef(null)

  const examIndex = useMemo(() => buildExamIndex(servicios, areasLaboratorio), [servicios, areasLaboratorio])
  const groupedServices = useMemo(() => serviciosPorArea(servicios, areasLaboratorio), [servicios, areasLaboratorio])
  const matches = useMemo(() => buscar(query, examIndex), [query, examIndex])
  const displayed = matches.slice(0, 12)

  useEffect(() => {
    if (!open || !listRef.current || highlightedIndex < 0) return
    const opt = listRef.current.querySelector(`#opcion-${highlightedIndex}`)
    opt?.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
  }, [highlightedIndex, open])

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
      return
    }
    if (ev.key === 'Enter') {
      ev.preventDefault()
      if (open && displayed.length > 0) {
        const item = displayed[highlightedIndex] ?? displayed[0]
        handleSelect(item.slug)
      }
      return
    }
    if (ev.key === 'ArrowDown' && open && displayed.length > 0) {
      ev.preventDefault()
      setHighlightedIndex((i) => (i + 1) % displayed.length)
      return
    }
    if (ev.key === 'ArrowUp' && open && displayed.length > 0) {
      ev.preventDefault()
      setHighlightedIndex((i) => (i - 1 + displayed.length) % displayed.length)
      return
    }
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <span className="flexIcon" style={{ marginBottom: '8px' }}>
                <div className="eyebrow" style={{ marginBottom: 0, fontSize: '1rem' }}>{t('servicesPage.eyebrow')}</div>
              </span>
              <h1 className="h1">{t('servicesPage.title')}</h1>
              <p className="lead">{t('servicesPage.lead')}</p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label={t('servicesPage.heroImageLabel')} />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div ref={wrapperRef} className="stackLg" style={{ position: 'relative', marginBottom: 'var(--space-6)' }}>
            <label className="label" htmlFor="buscar-examen">
              <span className="flexIcon" style={{ fontSize: '1.05rem' }}>
                <HiOutlineSearch className="iconSm" aria-hidden style={{ color: 'var(--c-pink-soft)', fontSize: '1.15rem' }} />
                {t('common.buttons.search')}
              </span>
            </label>
            <input
              id="buscar-examen"
              type="search"
              className="input"
              placeholder={t('servicesPage.searchPlaceholder')}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
                setHighlightedIndex(0)
                setOpen(true)
              }}
              onFocus={() => query.trim().length >= 1 && setOpen(true)}
              onKeyDown={handleKeyDown}
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls="buscar-examen-list"
              aria-expanded={open && matches.length > 0}
              aria-activedescendant={open && displayed[highlightedIndex] ? `opcion-${highlightedIndex}` : undefined}
            />
            {open && displayed.length > 0 ? (
              <ul
                ref={listRef}
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
                  background: 'var(--bg-elevated)',
                  borderColor: 'rgba(74, 144, 226, 0.28)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {displayed.map((item, i) => (
                  <li
                    key={`${item.slug}-${item.examNombre}-${i}`}
                    id={`opcion-${i}`}
                    role="option"
                    aria-selected={i === highlightedIndex}
                  >
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
                        background: i === highlightedIndex ? 'var(--c-pink-soft)' : 'transparent',
                        color: i === highlightedIndex ? 'var(--c-pink-dark)' : undefined,
                      }}
                      onMouseEnter={() => setHighlightedIndex(i)}
                      onClick={() => handleSelect(item.slug)}
                    >
                      <span className="lead" style={{ fontWeight: 500 }}>{item.examNombre}</span>
                      <span className="muted" style={{ fontSize: 13 }}> — {item.serviceTitle}{item.areaLabel && item.areaLabel !== item.serviceTitle ? ` · ${item.areaLabel}` : ''}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {query.trim().length >= 1 && matches.length === 0 ? (
              <p className="help" style={{ marginTop: '4px' }}>{t('servicesPage.noResults')}</p>
            ) : null}
          </div>

          <h2 className="h2" style={{ marginBottom: 'var(--space-4)' }}>
            {t('servicesPage.areasTitle')}
          </h2>
          <div className="stackLg" style={{ gap: 'var(--space-8)' }}>
            {groupedServices.map(({ area, servicios: list }) => (
              <section key={area.id} className="stackLg" aria-labelledby={`area-${area.id}`}>
                <h3 id={`area-${area.id}`} className="h3" style={{ margin: 0 }}>
                  {area.label}
                </h3>
                <div className="gridCardsWrap">
                  {list.map((s) => (
                    <article key={s.slug} className="card cardHover">
                      <div className="cardPad stack">
                        <div className="imgPlaceholder imgWide" aria-hidden="true" />
                        <div className="stack">
                          <div className="eyebrow" style={{ marginBottom: 0 }}>{s.title}</div>
                          <p className="lead muted">{s.desc}</p>
                        </div>
                        <Link to={`/servicios/${s.slug}`} className="btn btnSoft">
                          {t('common.buttons.check')}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

