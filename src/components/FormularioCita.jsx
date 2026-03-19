import { useState } from 'react'
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi'

export default function FormularioCita() {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    mensaje: '',
  })

  const [status, setStatus] = useState({ type: 'idle', message: '' })
  const [submitting, setSubmitting] = useState(false)

  const onChange = (key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setStatus({ type: 'idle', message: '' })

    const formElement = ev.currentTarget
    if (!formElement.reportValidity()) return
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
          telefono: form.telefono.trim(),
          email: form.email.trim(),
          mensaje: form.mensaje.trim(),
        }),
      })

      if (!response.ok) {
        throw new Error('formspree-request-failed')
      }

      setStatus({
        type: 'success',
        message: '¡Gracias! Tu mensaje fue enviado. Te contactaremos pronto.',
      })
      setForm({
        nombre: '',
        telefono: '',
        email: '',
        mensaje: '',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'No pudimos enviar tu mensaje. Por favor intenta nuevamente en unos minutos.',
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
              className={`alert ${
                status.type === 'success' ? 'alertOk' : status.type === 'error' ? 'alertErr' : ''
              }`}
              role={status.type === 'error' ? 'alert' : 'status'}
            >
              {status.message}
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
                  className="input"
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={onChange('nombre')}
                  placeholder="Ej: María López"
                  required
                />
              </label>

              <label className="label">
                <span className="flexIcon">
                  <HiOutlinePhone className="iconSm" aria-hidden />
                  Teléfono
                </span>
                <input
                  className="input"
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={onChange('telefono')}
                  placeholder="Ej: 7777-8888"
                />
              </label>
            </div>

            <div className="grid2Reverse">
              <label className="label">
                <span className="flexIcon">
                  <HiOutlineMail className="iconSm" aria-hidden />
                  Correo
                </span>
                <input
                  className="input"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder="Ej: maria@correo.com"
                  required
                />
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

