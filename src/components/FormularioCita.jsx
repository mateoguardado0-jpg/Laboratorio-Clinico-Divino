import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineCalendar, HiOutlineClock, HiOutlineDocumentText } from 'react-icons/hi'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d+()\-\s]/g, '').trim()
}

export default function FormularioCita() {
  const [form, setForm] = useState({
    nombreCompleto: '',
    telefono: '',
    email: '',
    fecha: '',
    hora: '',
    comentarios: '',
  })

  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  // EMAILJS CREDENCIALES:
  // 1) Crea un archivo `.env` (NO lo subas a GitHub) y coloca:
  //    VITE_EMAILJS_SERVICE_ID=TU_SERVICE_ID
  //    VITE_EMAILJS_TEMPLATE_ID=TU_TEMPLATE_ID
  //    VITE_EMAILJS_PUBLIC_KEY=TU_PUBLIC_KEY
  // 2) En Vercel: Project Settings → Environment Variables (mismos nombres).
  const emailJs = useMemo(
    () => ({
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    }),
    [],
  )

  const errors = useMemo(() => {
    const e = {}
    if (!form.nombreCompleto.trim()) e.nombreCompleto = 'Ingresa tu nombre completo.'
    if (!normalizePhone(form.telefono)) e.telefono = 'Ingresa un teléfono válido.'
    if (!isEmail(form.email)) e.email = 'Ingresa un correo válido.'
    if (!form.fecha) e.fecha = 'Selecciona una fecha.'
    if (!form.hora) e.hora = 'Selecciona una hora.'
    return e
  }, [form])

  const hasErrors = Object.keys(errors).length > 0

  const onChange = (key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (hasErrors) {
      setStatus({ type: 'error', message: 'Revisa los campos obligatorios.' })
      return
    }

    if (!emailJs.serviceId || !emailJs.templateId || !emailJs.publicKey) {
      setStatus({
        type: 'error',
        message:
          'Faltan credenciales de EmailJS. Configura las variables VITE_EMAILJS_* antes de enviar.',
      })
      return
    }

    setSubmitting(true)
    try {
      await emailjs.send(
        emailJs.serviceId,
        emailJs.templateId,
        {
          nombreCompleto: form.nombreCompleto.trim(),
          telefono: normalizePhone(form.telefono),
          email: form.email.trim(),
          fecha: form.fecha,
          hora: form.hora,
          comentarios: form.comentarios.trim(),
        },
        { publicKey: emailJs.publicKey },
      )

      setStatus({ type: 'success', message: 'Cita enviada. Te contactaremos pronto.' })
      setForm({
        nombreCompleto: '',
        telefono: '',
        email: '',
        fecha: '',
        hora: '',
        comentarios: '',
      })
    } catch {
      setStatus({
        type: 'error',
        message:
          'No se pudo enviar la cita. Verifica tu configuración de EmailJS e inténtalo de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="card formWrap">
      <div className="cardPad">
        <div className="stackLg">
          <div className="stack">
            <div className="eyebrow">Formulario de cita</div>
            <h2 className="h2">Agenda con tus datos básicos</h2>
            <p className="lead muted">
              Sin DUI, sin tipo de examen. Solo lo necesario para coordinar tu visita.
            </p>
          </div>

          {status.type !== 'idle' ? (
            <div
              className={`alert ${
                status.type === 'success' ? 'alertOk' : status.type === 'error' ? 'alertErr' : ''
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
            >
              {status.message}
            </div>
          ) : null}

          <form onSubmit={onSubmit} className="stackLg" noValidate>
            <div className="grid2">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineUser className="iconSm" aria-hidden />
                  Nombre completo *
                </span>
                <input
                  className="input"
                  value={form.nombreCompleto}
                  onChange={onChange('nombreCompleto')}
                  placeholder="Tu nombre y apellido"
                  required
                  aria-invalid={Boolean(errors.nombreCompleto)}
                />
                {errors.nombreCompleto ? <span className="help">{errors.nombreCompleto}</span> : null}
              </label>

              <label className="label">
                <span className="flexIcon">
                  <HiOutlinePhone className="iconSm" aria-hidden />
                  Teléfono *
                </span>
                <input
                  className="input"
                  value={form.telefono}
                  onChange={onChange('telefono')}
                  placeholder="Ej. +503 0000 0000"
                  required
                  aria-invalid={Boolean(errors.telefono)}
                />
                {errors.telefono ? <span className="help">{errors.telefono}</span> : null}
              </label>
            </div>

            <div className="grid2Reverse">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineMail className="iconSm" aria-hidden />
                  Correo electrónico *
                </span>
                <input
                  className="input"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="tu@correo.com"
                  required
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <span className="help">{errors.email}</span> : null}
              </label>

              <div className="grid2" style={{ gap: 16 }}>
                <label className="label">
                  <span className="flexIcon">
                    <HiOutlineCalendar className="iconSm" aria-hidden />
                    Fecha *
                  </span>
                  <input
                    className="input"
                    type="date"
                    value={form.fecha}
                    onChange={onChange('fecha')}
                    required
                    aria-invalid={Boolean(errors.fecha)}
                  />
                  {errors.fecha ? <span className="help">{errors.fecha}</span> : null}
                </label>

                <label className="label">
                  <span className="flexIcon">
                    <HiOutlineClock className="iconSm" aria-hidden />
                    Hora *
                  </span>
                  <input
                    className="input"
                    type="time"
                    value={form.hora}
                    onChange={onChange('hora')}
                    required
                    aria-invalid={Boolean(errors.hora)}
                  />
                  {errors.hora ? <span className="help">{errors.hora}</span> : null}
                </label>
              </div>
            </div>

            <label className="label">
              <span className="flexIcon">
                <HiOutlineDocumentText className="iconSm" aria-hidden />
                Comentarios (opcional)
              </span>
              <textarea
                className="input textarea"
                value={form.comentarios}
                onChange={onChange('comentarios')}
                placeholder="Déjanos un comentario breve si lo deseas."
              />
              <span className="help">No incluyas información sensible.</span>
            </label>

            <div className="btnRow">
              <button
                type="submit"
                className="btn btnPrimary"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? 'Enviando…' : 'Enviar cita'}
              </button>
              <button
                type="button"
                className="btn btnSoft"
                onClick={() =>
                  setForm({
                    nombreCompleto: '',
                    telefono: '',
                    email: '',
                    fecha: '',
                    hora: '',
                    comentarios: '',
                  })
                }
              >
                Limpiar
              </button>
              <span className="help">
                {hasErrors ? 'Completa los campos obligatorios para enviar.' : 'Listo para enviar.'}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

