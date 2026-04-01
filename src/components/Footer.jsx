import { NavLink } from 'react-router-dom'
import { HiOutlinePhone, HiOutlineMail, HiOutlineLocationMarker, HiOutlineClock } from 'react-icons/hi'
import { useI18n } from '../i18n/useI18n.jsx'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footerGrid">
          <div className="stack">
            <div className="brand">
              <span className="brandName">{t('brand.name')}</span>
            </div>
            <div className="flexIcon footerSchedule">
              <HiOutlineClock className="iconSm" aria-hidden />
              <div>
                <strong>{t('footer.scheduleTitle')}</strong>
                <br />
                <span className="muted">{t('footer.weekdays')}</span>
                <br />
                <span className="muted">{t('footer.saturday')}</span>
              </div>
            </div>
          </div>

          <div className="stack">
            <div className="stack">
              <NavLink className="navLink" to="/">
                {t('nav.home')}
              </NavLink>
              <NavLink className="navLink" to="/nosotros">
                {t('nav.about')}
              </NavLink>
              <NavLink className="navLink" to="/servicios">
                {t('nav.services')}
              </NavLink>
              <NavLink className="navLink" to="/contacto">
                {t('nav.contact')}
              </NavLink>
            </div>
          </div>

          <div className="stack">
            <div className="eyebrow">{t('footer.contact')}</div>
            <div className="stack" style={{ gap: '10px' }}>
              <div className="flexIcon">
                <HiOutlinePhone className="iconSm" aria-hidden />
                <div><strong>{t('footer.phone')}</strong><br /><span className="muted">7086-4066, 7069-0219, 2356-0111</span></div>
              </div>
              <div className="flexIcon">
                <HiOutlineMail className="iconSm" aria-hidden />
                <div><strong>{t('footer.email')}</strong><br /><span className="muted">divinonjesus.lab@gmail.com</span></div>
              </div>
              <div className="flexIcon">
                <HiOutlineLocationMarker className="iconSm" aria-hidden />
                <div><strong>{t('footer.address')}</strong><br /><span className="muted">{t('footer.addressValue')}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="footerSmall">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}
