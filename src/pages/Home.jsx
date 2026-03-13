import { Link } from 'react-router-dom'
import { HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineShieldCheck } from 'react-icons/hi'
import { useI18n } from '../i18n/useI18n.jsx'

export default function Home() {
  const { t, get } = useI18n()
  const kpis = get('home.kpis', [])
  const featured = get('home.featured', [])

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg heroContent">
              <h1 className="h1">{t('home.heroTitle')}</h1>
              <p className="lead">{t('home.heroLead')}</p>
              <div className="kpiRow">
                {kpis.map((item, index) => {
                  const Icon = [HiOutlineUserGroup, HiOutlineClipboardList, HiOutlineShieldCheck][index] || HiOutlineUserGroup
                  return (
                    <div className="kpi" key={item.title}>
                      <span className="flexIcon">
                        <Icon className="iconMd" aria-hidden />
                        <strong>{item.title}</strong>
                      </span>
                      <span>{item.desc}</span>
                    </div>
                  )
                })}
              </div>
              <div className="btnRow">
                <Link to="/contacto#consultas" className="btn btnPrimary">
                  {t('common.buttons.consultas')}
                </Link>
                <Link to="/servicios" className="btn btnSoft">
                  {t('common.buttons.viewServices')}
                </Link>
              </div>
            </div>
            <div className="imgPlaceholder imgHero heroImage" aria-label={t('home.heroImageLabel')} />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">{t('home.featuredTitle')}</h2>
            <p className="lead muted">{t('home.featuredLead')}</p>

            <div className="gridCards">
              {featured.map((s) => (
                <article key={s.title} className="card cardHover">
                  <div className="cardPad stack">
                    <div className="imgPlaceholder imgWide" aria-hidden="true" />
                    <div className="stack">
                      <div className="eyebrow">{s.title}</div>
                      <p className="lead">{s.desc}</p>
                    </div>
                    <div className="btnRow">
                      <Link to="/servicios" className="btn btnSoft">
                        {t('common.buttons.viewMore')}
                      </Link>
                      <Link to="/contacto#consultas" className="btn btnPrimary">
                        {t('common.buttons.consultas')}
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="ctaSection card">
            <div className="cardPad">
              <div className="grid2Reverse">
                <div className="imgPlaceholder imgWide" aria-label={t('home.ctaImageLabel')} />
                <div className="stackLg">
                  <h2 className="h2">{t('home.ctaTitle')}</h2>
                  <p className="lead">{t('home.ctaLead')}</p>
                  <div className="btnRow">
                    <Link to="/contacto#consultas" className="btn btnPrimary">
                      {t('common.buttons.consultas')}
                    </Link>
                    <Link to="/contacto" className="btn">
                      {t('common.buttons.contact')}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
