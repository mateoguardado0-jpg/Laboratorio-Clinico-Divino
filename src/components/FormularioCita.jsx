import { useState } from 'react'
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '')
}

export default function FormularioCita() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  })

  const [status, setStatus] = useState({ type: 'idle', message: '', details: [] })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const onChange = (key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({ ...f, [key]: value }))
    setFieldErrors((prev) => {
      if (!prev[key]) return prev
      const next = { ...prev }
      delete next[key]
      return next
    })
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setStatus({ type: 'idle', message: '', details: [] })

    const formElement = ev.currentTarget
    if (!formElement.reportValidity()) return

    const nextFieldErrors = {}
    const sanitizedPhone = normalizePhone(form.telefono)

    if (form.telefono.trim() && sanitizedPhone.length !== 8) {
      nextFieldErrors.telefono = 'El teléfono debe tener 8 dígitos.'
    }
    if (!EMAIL_REGEX.test(form.email.trim())) {
      nextFieldErrors.email = 'Ingresa un correo válido que incluya @ y punto.'
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setStatus({
        type: 'error',
        message: 'Por favor corrige los campos marcados antes de enviar.',
        details: Object.values(nextFieldErrors),
      })
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/mvzwlwkj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          nombre: form.nombre.trim(),
          telefono: sanitizedPhone,
          email: form.email.trim(),
          mensaje: form.mensaje.trim(),
        }),
      })

      if (!response.ok) {
        let remoteMessage = ''
        try {
          const data = await response.json()
          if (Array.isArray(data?.errors) && data.errors.length > 0) {
            remoteMessage = data.errors.map((item) => item.message).join(' ')
          }
        } catch {
          remoteMessage = ''
        }

        throw new Error(remoteMessage || 'No se pudo procesar la solicitud.')
      }

      setStatus({
        type: 'success',
        message: '¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.',
        details: [],
      })
      setForm({
        nombre: '',
        telefono: '',
        email: '',
        mensaje: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'No pudimos enviar tu mensaje en este momento.',
        details: [
          error instanceof Error && error.message
            ? error.message
            : 'Intenta nuevamente en unos minutos.',
        ],
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
            <div className="eyebrow">Contacto</div>
            <h2 className="h2">Envíanos un mensaje</h2>
            <p className="lead muted">
              Completa el formulario y nuestro equipo te responderá a la brevedad.
            </p>
          </div>

          {status.type !== 'idle' ? (
            <div
              className={`alert formStatus ${
                status.type === 'success' ? 'alertOk' : status.type === 'error' ? 'alertErr' : ''
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              <div className="formStatusHead">
                {status.type === 'success' ? (
                  <HiOutlineCheckCircle className="formStatusIcon isSuccess" aria-hidden />
                ) : (
                  <HiOutlineExclamationCircle className="formStatusIcon isError" aria-hidden />
                )}
                <strong className="formStatusTitle">{status.message}</strong>
              </div>
              {status.details?.length ? (
                <ul className="alertList">
                  {status.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          <form
            onSubmit={onSubmit}
            className="stackLg"
            action="https://formspree.io/f/mvzwlwkj"
            method="POST"
          >
            <div className="grid2">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineUser className="iconSm" aria-hidden />
                  Nombre
                </span>
                <input
                  className={`input ${fieldErrors.nombre ? 'inputInvalid' : ''}`}
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange('nombre')}
                  placeholder="Ej: María López"
                  required
                />
                {fieldErrors.nombre ? <span className="help errorText">{fieldErrors.nombre}</span> : null}
              </label>

              <label className="label">
                <span className="flexIcon">
                  <HiOutlinePhone className="iconSm" aria-hidden />
                  Teléfono
                </span>
                <input
                  className={`input ${fieldErrors.telefono ? 'inputInvalid' : ''}`}
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange('telefono')}
                  placeholder="Ej: 7777-8888"
                  pattern="^\d{4}-?\d{4}$"
                  title="Ingresa un teléfono de 8 dígitos (ejemplo: 7777-8888)."
                />
                {fieldErrors.telefono ? (
                  <span className="help errorText">{fieldErrors.telefono}</span>
                ) : (
                  <span className="help">Opcional. Puedes escribir 7777-8888.</span>
                )}
              </label>
            </div>

            <div className="grid2Reverse">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineMail className="iconSm" aria-hidden />
                  Correo
                </span>
                <input
                  className={`input ${fieldErrors.email ? 'inputInvalid' : ''}`}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="Ej: maria@correo.com"
                  required
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Ingresa un correo válido que incluya @ y punto."
                />
                {fieldErrors.email ? <span className="help errorText">{fieldErrors.email}</span> : null}
              </label>
            </div>

            <label className="label">
              <span className="flexIcon">
                <HiOutlineDocumentText className="iconSm" aria-hidden />
                Mensaje
              </span>
              <textarea
                className="input textarea"
                name="mensaje"
                value={form.mensaje}
                onChange={onChange('mensaje')}
                placeholder="Cuéntanos en qué podemos ayudarte."
                required
              />
            </label>

            <div className="btnRow">
              <button
                type="submit"
                className="btn btnPrimary"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar mensaje'}
              </button>
              <button
                type="button"
                className="btn btnSoft"
                onClick={() =>
                  setForm({
                    nombre: '',
                    telefono: '',
                    email: '',
                    mensaje: '',
                  })
                }
                disabled={submitting}
              >
                Limpiar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

