/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import es from '../translations/es.json'
import en from '../translations/en.json'

const STORAGE_KEY = 'site_lang'
const SUPPORTED_LANGUAGES = ['es', 'en']

const I18nContext = createContext(null)

function getNestedValue(obj, key) {
  if (!obj) return undefined
  return key.split('.').reduce((acc, part) => (acc == null ? undefined : acc[part]), obj)
}

function interpolate(template, vars) {
  if (!vars || typeof template !== 'string') return template
  return template.replace(/\{(\w+)\}/g, (_, token) =>
    Object.prototype.hasOwnProperty.call(vars, token) ? String(vars[token]) : `{${token}}`,
  )
}

function detectInitialLang() {
  const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) return saved

  const browserLang =
    typeof navigator !== 'undefined' && navigator.language ? navigator.language.toLowerCase() : ''
  if (browserLang.startsWith('en')) return 'en'
  return 'es'
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [lang])

  const messages = useMemo(() => ({ es, en }), [])

  const get = (key, fallback = key) => {
    const current = getNestedValue(messages[lang], key)
    if (current !== undefined) return current
    const spanish = getNestedValue(messages.es, key)
    if (spanish !== undefined) return spanish
    return fallback
  }

  const t = (key, vars) => {
    const value = get(key, key)
    if (typeof value === 'string') return interpolate(value, vars)
    if (typeof value === 'number') return String(value)
    return value
  }

  const value = {
    lang,
    setLang,
    t,
    get,
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n debe usarse dentro de I18nProvider')
  }
  return ctx
}
