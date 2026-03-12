import { useMemo, useState } from 'react'
import FormularioCita from '../components/FormularioCita.jsx'
import { HiOutlinePhone, HiOutlineMail, HiOutlineClock, HiOutlineMap } from 'react-icons/hi'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import { useI18n } from '../i18n/useI18n.jsx'

const LAB_POSITION = [14.092553044052153, -89.10661168928581]

const defaultMarker = L.icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

export default function Contacto() {
  const { t } = useI18n()
  const [showMapPlatformChooser, setShowMapPlatformChooser] = useState(false)

  const mapUrls = useMemo(() => {
    const [lat, lng] = LAB_POSITION
    return {
      google: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
      waze: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
    }
  }, [])

  const openMapApp = (platform) => {
    const targetUrl = platform === 'waze' ? mapUrls.waze : mapUrls.google
    window.open(targetUrl, '_blank', 'noopener,noreferrer')
  }

  const handleOpenDirections = () => {
    const isMobile = window.matchMedia('(max-width: 900px)').matches

    if (isMobile) {
      setShowMapPlatformChooser(true)
      return
    }

    openMapApp('google')
  }

  const handleMapPlatformSelect = (platform) => {
    setShowMapPlatformChooser(false)
    openMapApp(platform)
  }

  return (
    <main className="page">
      <section className="section">
        <div className="container">
          <div className="grid2">
            <div className="stackLg">
              <div className="eyebrow">{t('contact.eyebrow')}</div>
              <h1 className="h1">{t('contact.title')}</h1>
              <p className="lead">{t('contact.lead')}</p>

              <div className="gridCards">
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlinePhone className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>{t('contact.phone')}</div>
                  </div>
                  <p className="lead">+503 0000 0000</p>
                </div>
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineMail className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>{t('contact.email')}</div>
                  </div>
                  <p className="lead">citas@laboratoriodivinojesus.com</p>
                </div>
                <div className="card cardPad">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineClock className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>{t('contact.schedule')}</div>
                  </div>
                  <p className="lead">{t('contact.scheduleValue')}</p>
                </div>
              </div>
            </div>

            <div className="stackLg">
              <div className="card">
                <div className="cardPad stack">
                  <div className="flexIcon" style={{ marginBottom: '6px' }}>
                    <HiOutlineMap className="iconMd" aria-hidden />
                    <div className="eyebrow" style={{ marginBottom: 0 }}>{t('common.labels.map')}</div>
                  </div>
                  <div className="mapWrap" aria-label={t('contact.mapAria')}>
                    <MapContainer
                      center={LAB_POSITION}
                      zoom={16}
                      scrollWheelZoom
                      className="leafletMap"
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={LAB_POSITION} icon={defaultMarker}>
                        <Popup>
                          <strong>{t('contact.popupTitle')}</strong>
                          <br />
                          {t('contact.popupAddress')}
                          <br />
                          <button
                            type="button"
                            className="btn btnSoft mapActionBtn"
                            onClick={handleOpenDirections}
                          >
                            {t('contact.howToGet')}
                          </button>
                        </Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <p className="help">{t('contact.mapHelp')}</p>
                </div>
              </div>

              <div className="card">
                <div className="cardPad stack">
                  <div className="eyebrow">{t('contact.messageEyebrow')}</div>
                  <p className="lead">{t('contact.messageLead')}</p>
                  <div className="btnRow">
                    <a className="btn btnSoft" href="#consultas">
                      {t('common.buttons.goToConsultas')}
                    </a>
                    <a className="btn" href="/servicios">
                      {t('common.buttons.viewServices')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionTight" id="consultas">
        <div className="container">
          <FormularioCita />
        </div>
      </section>

      {showMapPlatformChooser && (
        <div
          className="mapChooserOverlay"
          role="dialog"
          aria-modal="true"
          aria-label={t('contact.chooserAria')}
        >
          <div className="mapChooserCard">
            <div className="eyebrow">{t('common.labels.map')}</div>
            <p className="lead">{t('contact.chooserLead')}</p>
            <div className="mapChooserActions">
              <button
                type="button"
                className="btn btnPrimary"
                onClick={() => handleMapPlatformSelect('google')}
              >
                Google Maps
              </button>
              <button
                type="button"
                className="btn btnSoft"
                onClick={() => handleMapPlatformSelect('waze')}
              >
                Waze
              </button>
              <button
                type="button"
                className="btn"
                onClick={() => setShowMapPlatformChooser(false)}
              >
                {t('common.buttons.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

