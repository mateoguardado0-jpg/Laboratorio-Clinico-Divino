import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import { HiOutlineUser, HiOutlinePhone, HiOutlineMail, HiOutlineDocumentText } from 'react-icons/hi'
import { useI18n } from '../i18n/useI18n.jsx'

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

function normalizePhone(value) {
  return String(value || '').replace(/[^\d+()\-\s]/g, '').trim()
}

export default function FormularioCita() {
  const { t } = useI18n()
  const [form, setForm] = useState({
    nombreCompleto: '',
    telefono: '',
    email: '',
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
    if (!form.nombreCompleto.trim()) e.nombreCompleto = t('form.errors.fullName')
    if (!normalizePhone(form.telefono)) e.telefono = t('form.errors.phone')
    if (!isEmail(form.email)) e.email = t('form.errors.email')
    return e
  }, [form, t])

  const hasErrors = Object.keys(errors).length > 0

  const onChange = (key) => (ev) => {
    const value = ev.target.value
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    setStatus({ type: 'idle', message: '' })

    if (hasErrors) {
      setStatus({ type: 'error', message: t('form.errors.requiredFields') })
      return
    }

    if (!emailJs.serviceId || !emailJs.templateId || !emailJs.publicKey) {
      setStatus({
        type: 'error',
        message: t('form.errors.missingCredentials'),
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
          comentarios: form.comentarios.trim(),
        },
        { publicKey: emailJs.publicKey },
      )

      setStatus({ type: 'success', message: t('form.success') })
      setForm({
        nombreCompleto: '',
        telefono: '',
        email: '',
        comentarios: '',
      })
    } catch {
      setStatus({
        type: 'error',
        message: t('form.errors.sendFailed'),
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
            <div className="eyebrow">{t('form.eyebrow')}</div>
            <h2 className="h2">{t('form.title')}</h2>
            <p className="lead muted">{t('form.lead')}</p>
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
                  {t('form.fullName')}
                </span>
                <input
                  className="input"
                  value={form.nombreCompleto}
                  onChange={onChange('nombreCompleto')}
                  placeholder={t('form.fullNamePlaceholder')}
                  required
                  aria-invalid={Boolean(errors.nombreCompleto)}
                />
                {errors.nombreCompleto ? <span className="help">{errors.nombreCompleto}</span> : null}
              </label>

              <label className="label">
                <span className="flexIcon">
                  <HiOutlinePhone className="iconSm" aria-hidden />
                  {t('form.phone')}
                </span>
                <input
                  className="input"
                  value={form.telefono}
                  onChange={onChange('telefono')}
                  placeholder={t('form.phonePlaceholder')}
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
                  {t('form.email')}
                </span>
                <input
                  className="input"
                  value={form.email}
                  onChange={onChange('email')}
                  placeholder={t('form.emailPlaceholder')}
                  required
                  aria-invalid={Boolean(errors.email)}
                />
                {errors.email ? <span className="help">{errors.email}</span> : null}
              </label>
            </div>

            <label className="label">
              <span className="flexIcon">
                <HiOutlineDocumentText className="iconSm" aria-hidden />
                {t('form.comments')}
              </span>
              <textarea
                className="input textarea"
                value={form.comentarios}
                onChange={onChange('comentarios')}
                placeholder={t('form.commentsPlaceholder')}
              />
              <span className="help">{t('form.commentsHelp')}</span>
            </label>

            <div className="btnRow">
              <button
                type="submit"
                className="btn btnPrimary"
                disabled={submitting}
                aria-disabled={submitting}
              >
                {submitting ? t('common.buttons.sending') : t('common.buttons.sendInquiry')}
              </button>
              <button
                type="button"
                className="btn btnSoft"
                onClick={() =>
                  setForm({
                    nombreCompleto: '',
                    telefono: '',
                    email: '',
                    comentarios: '',
                  })
                }
              >
                {t('common.buttons.clear')}
              </button>
              <span className="help">
                {hasErrors ? t('form.fillRequired') : t('form.readyToSend')}
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

