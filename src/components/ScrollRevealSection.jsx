import { useEffect, useRef, useState } from 'react'

function prefersReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Añade la clase scrollReveal--visible cuando la sección entra en vista.
 * Solo presentación (animación al scroll); no altera contenido ni rutas.
 */
export default function ScrollRevealSection({ className = '', children, ...rest }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const el = ref.current
    if (!el) return

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const merged = [className, 'scrollReveal', visible && 'scrollReveal--visible']
    .filter(Boolean)
    .join(' ')

  return (
    <section ref={ref} className={merged} {...rest}>
      {children}
    </section>
  )
}
