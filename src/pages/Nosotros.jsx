import { HiOutlineHeart, HiOutlineBadgeCheck, HiOutlineFlag, HiOutlineHand } from 'react-icons/hi'
import { useI18n } from '../i18n/useI18n.jsx'

export default function Nosotros() {
  const { t, get } = useI18n()
  const valores = get('about.values', [])
  const team = get('about.team', [])
  const historia = get('about.history', [])

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">{t('about.eyebrow')}</div>
              <h1 className="h1">{t('about.title')}</h1>
              <p className="lead">{t('about.lead')}</p>
            </div>
            <div className="imgPlaceholder imgHero" aria-label={t('about.heroImageLabel')} />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="grid2Reverse">
            <div className="imgPlaceholder imgWide" aria-label={t('about.historyImageLabel')} />
            <div className="stackLg">
              <h2 className="h2">{t('about.historyTitle')}</h2>
              {historia.map((p) => (
                <p key={p} className="lead">
                  {p}
                </p>
              ))}
              <div className="btnRow">
                <a className="btn btnSoft" href="/contacto#consultas">
                  {t('common.buttons.consultas')}
                </a>
                <a className="btn" href="/servicios">
                  {t('common.buttons.viewServices')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <h2 className="h2">{t('about.missionVisionTitle')}</h2>
              <div className="stack">
                <div className="card cardPad">
                  <div className="eyebrow">{t('about.missionTitle')}</div>
                  <p className="lead">{t('about.mission')}</p>
                </div>
                <div className="card cardPad">
                  <div className="eyebrow">{t('about.visionTitle')}</div>
                  <p className="lead">{t('about.vision')}</p>
                </div>
              </div>
            </div>
            <div className="imgPlaceholder imgWide" aria-label={t('about.missionImageLabel')} />
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <div className="eyebrow">{t('about.valuesEyebrow')}</div>
            <h2 className="h2">{t('about.valuesTitle')}</h2>
            <p className="lead muted">{t('about.valuesLead')}</p>
            <div className="gridCards">
              {valores.map((v, index) => {
                const icons = [HiOutlineBadgeCheck, HiOutlineHand, HiOutlineFlag, HiOutlineHeart, HiOutlineBadgeCheck, HiOutlineHeart]
                const Icon = icons[index] || HiOutlineBadgeCheck
                return (
                  <article key={v.title} className="card cardHover">
                    <div className="cardPad stack">
                      <span className="flexIcon">
                        <Icon className="iconLg" aria-hidden style={{ color: 'var(--c-pink-soft)' }} />
                        <div className="eyebrow" style={{ marginBottom: 0 }}>{v.title}</div>
                      </span>
                      <p className="lead muted">{v.desc}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sectionTight">
        <div className="container">
          <div className="stackLg">
            <h2 className="h2">{t('about.teamTitle')}</h2>
            <p className="lead muted">{t('about.teamLead')}</p>

            <div className="gridTeam">
              {team.map((m) => (
                <article key={m.role} className="card cardHover">
                  <div className="cardPad stack">
                    <div className="imgPlaceholder imgSquare" aria-hidden="true" />
                    <div className="stack">
                      <div className="eyebrow">{m.role}</div>
                      <div className="lead" style={{ fontWeight: 800 }}>
                        {m.name}
                      </div>
                      <p className="lead muted">{m.bio}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

