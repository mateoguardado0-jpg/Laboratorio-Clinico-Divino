import { Link, useParams, Navigate } from 'react-router-dom'
import { HiOutlineArrowLeft } from 'react-icons/hi'
import ScrollRevealSection from '../components/ScrollRevealSection.jsx'
import { getCatalogData } from '../data/servicios.js'
import { useI18n } from '../i18n/useI18n.jsx'

export default function ServicioDetalle() {
  const { slug } = useParams()
  const { t } = useI18n()
  const { servicios } = getCatalogData(t)
  const servicio = servicios.find((s) => s.slug === slug)

  if (!servicio) {
    return <Navigate to="/servicios" replace />
  }

  return (
    <main className="page">
      <ScrollRevealSection className="section">
        <div className="container">
          <div className="stackLg">
            <Link
              to="/servicios"
              className="flexIcon btn btnSoft backLink"
            >
              <HiOutlineArrowLeft className="iconSm" aria-hidden />
              {t('serviceDetail.backToServices')}
            </Link>

            <div className="eyebrow detailEyebrow">{t('common.labels.service')}</div>
            <h1 className="h1">{servicio.title}</h1>
            <p className="lead">{servicio.desc}</p>

            <div className="stackLg detailExamSection">
              <h2 className="h2">{t('common.labels.examens')}</h2>
              <p className="lead muted">{t('serviceDetail.lead')}</p>

              <div className="stack examStackGap">
                {servicio.examenes.map((examen) => (
                  <article key={examen.nombre} className="card cardPad">
                    <div className="stack">
                      <h3 className="examTitle">
                        {examen.nombre}
                      </h3>
                      <div className="stack examMetaStack">
                        <div>
                          <span className="help examBlockLabel">
                            {t('common.labels.requirements')}
                          </span>
                          <ul className="lead muted examList">
                            {examen.requisitos.map((req, i) => (
                              <li key={i}>{req}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="help examBlockLabel">
                            {t('common.labels.deliveryTime')}
                          </span>
                          <p className="lead examDelivery">
                            {examen.tiempoEntrega}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="btnRow detailActions">
                <Link to="/contacto#consultas" className="btn btnPrimary">
                  {t('common.buttons.consultas')}
                </Link>
                <Link to="/servicios" className="btn btnSoft">
                  {t('common.buttons.allServices')}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ScrollRevealSection>
    </main>
  )
}
