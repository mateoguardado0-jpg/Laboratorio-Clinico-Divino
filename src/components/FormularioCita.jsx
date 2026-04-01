import { useState } from 'react'
import {
  HiOutlineUser,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineDocumentText,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineExclamation,
} from 'react-icons/hi'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function normalizePhone(value) {
  return String(value || '').replace(/\D/g, '')
}

function validateForm(form) {
  const errors = {}

  if (!form.nombre.trim()) {
    errors.nombre = 'El nombre es obligatorio.'
  }

  if (!form.email.trim()) {
    errors.email = 'El correo es obligatorio.'
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = 'Ingresa un correo válido que incluya @ y punto.'
  }

  if (!form.mensaje.trim()) {
    errors.mensaje = 'El mensaje es obligatorio.'
  }

  const sanitizedPhone = normalizePhone(form.telefono)
  if (form.telefono.trim() && sanitizedPhone.length !== 8) {
    errors.telefono = 'El teléfono debe tener 8 dígitos (ej: 7777-8888).'
  }

  return { errors, sanitizedPhone }
}

function FieldError({ id, message }) {
  return (
    <span id={id} className="fieldError" role="alert">
      <HiOutlineExclamation className="fieldErrorIcon" aria-hidden />
      {message}
    </span>
  )
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

    const { errors: nextFieldErrors, sanitizedPhone } = validateForm(form)

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      setStatus({
        type: 'error',
        message: 'Hay campos que necesitan tu atención.',
        details: [
          nextFieldErrors.nombre,
          nextFieldErrors.telefono,
          nextFieldErrors.email,
          nextFieldErrors.mensaje,
        ].filter(Boolean),
      })
      return
    }

    setFieldErrors({})
    setSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xjgpoqgq', {
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
        message: '¡Gracias! Tu mensaje fue enviado correctamente.',
        details: ['Nuestro equipo te contactará a la brevedad.'],
      })
      setForm({ nombre: '', telefono: '', email: '', mensaje: '' })
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

          {status.type !== 'idle' && (
            <div
              className={`formBanner ${status.type === 'success' ? 'formBannerOk' : 'formBannerErr'}`}
              role={status.type === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              <div className="formBannerIcon">
                {status.type === 'success' ? (
                  <HiOutlineCheckCircle aria-hidden />
                ) : (
                  <HiOutlineXCircle aria-hidden />
                )}
              </div>
              <div className="formBannerBody">
                <p className="formBannerTitle">{status.message}</p>
                {status.details?.length > 0 && (
                  <ul className="formBannerList">
                    {status.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className="stackLg"
            action="https://formspree.io/f/xjgpoqgq"
            method="POST"
            noValidate
          >
            <div className="grid2">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineUser className="iconSm" aria-hidden />
                  Nombre
                </span>
                <input
                  className={`input${fieldErrors.nombre ? ' inputInvalid' : ''}`}
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange('nombre')}
                  placeholder="Ej: María López"
                  aria-invalid={fieldErrors.nombre ? 'true' : 'false'}
                  aria-describedby={fieldErrors.nombre ? 'error-nombre' : undefined}
                />
                {fieldErrors.nombre && (
                  <FieldError id="error-nombre" message={fieldErrors.nombre} />
                )}
              </label>

              <label className="label">
                <span className="flexIcon">
                  <HiOutlinePhone className="iconSm" aria-hidden />
                  Teléfono <span className="fieldOptional">Opcional</span>
                </span>
                <input
                  className={`input${fieldErrors.telefono ? ' inputInvalid' : ''}`}
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange('telefono')}
                  placeholder="Ej: 7777-8888"
                  inputMode="numeric"
                  maxLength={9}
                  aria-invalid={fieldErrors.telefono ? 'true' : 'false'}
                  aria-describedby={fieldErrors.telefono ? 'error-telefono' : 'help-telefono'}
                />
                {fieldErrors.telefono ? (
                  <FieldError id="error-telefono" message={fieldErrors.telefono} />
                ) : (
                  <span id="help-telefono" className="help">8 dígitos, ej: 7777-8888.</span>
                )}
              </label>
            </div>

            <div className="grid2Reverse">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineMail className="iconSm" aria-hidden />
                  Correo electrónico
                </span>
                <input
                  className={`input${fieldErrors.email ? ' inputInvalid' : ''}`}
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="Ej: maria@correo.com"
                  aria-invalid={fieldErrors.email ? 'true' : 'false'}
                  aria-describedby={fieldErrors.email ? 'error-email' : undefined}
                />
                {fieldErrors.email && (
                  <FieldError id="error-email" message={fieldErrors.email} />
                )}
              </label>
            </div>

            <label className="label">
              <span className="flexIcon">
                <HiOutlineDocumentText className="iconSm" aria-hidden />
                Mensaje
              </span>
              <textarea
                className={`input textarea${fieldErrors.mensaje ? ' inputInvalid' : ''}`}
                name="mensaje"
                value={form.mensaje}
                onChange={onChange('mensaje')}
                placeholder="Cuéntanos en qué podemos ayudarte."
                aria-invalid={fieldErrors.mensaje ? 'true' : 'false'}
                aria-describedby={fieldErrors.mensaje ? 'error-mensaje' : undefined}
              />
              {fieldErrors.mensaje && (
                <FieldError id="error-mensaje" message={fieldErrors.mensaje} />
              )}
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
                onClick={() => setForm({ nombre: '', telefono: '', email: '', mensaje: '' })}
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
